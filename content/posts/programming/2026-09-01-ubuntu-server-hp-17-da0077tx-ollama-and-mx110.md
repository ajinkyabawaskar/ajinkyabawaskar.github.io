---
title: 'Turning my old HP laptop into a local AI server'
date: '2026-09-01'
categories:
  - Programming
---

I had an HP 17 da0077tx sitting around. It is not a fast machine anymore, Intel i5-8250U, 4 cores 8 threads, UHD 620, and an MX110 with 2 GB VRAM. I added a 500 GB SSD for the OS and kept the original 1 TB HDD at `/mnt/storage`. The idea was simple. Put a light server OS on it, run Ollama and Open WebUI, and see if I could get a usable ChatGPT-like setup at home without paying for API calls.

It mostly worked. The interesting part was not the install, it was figuring out where the hardware actually helps and where it does not.

### Why Ubuntu Server

I wanted something minimal that stays on. Ubuntu Server 26.04 LTS made sense because the install is quick and everything I needed has a package.

I grabbed the ISO from the Ubuntu download page and flashed it to an 8 GB USB drive with BalenaEtcher. Rufus works too if you are on Windows.

On this HP you tap F10 right after power on to get into BIOS. Under System Configuration, Boot Options, I turned Secure Boot off and made sure USB Boot was on. Then F9 on the next boot to pick the USB drive, and on the GRUB screen I chose Try or Install Ubuntu Server.

I plugged in Ethernet for the install. Wifi during Server setup is hit or miss, and a cable just avoids that. I picked language and keyboard, left proxy and mirror on defaults, chose Use an entire disk on the 500 GB SSD and left LVM on, created my user and server name, and checked Install OpenSSH Server. I skipped extra snaps. Reboot, pull the USB stick when it asks, and it came up headless. From another laptop on the same network I could already `ssh` in over Ethernet.

That part felt smooth. The next boot without Ethernet is where it got annoying.

### Wifi was the first real problem

Ubuntu Server ships with systemd-networkd. There is no `nmtui`, no `nmcli`, nothing interactive for wifi. So after I unplugged Ethernet, I had no network.

I tethered my phone over USB to get temporary internet. That was enough to install what I actually wanted:

```bash
sudo apt update
sudo apt install network-manager wpasupplicant
```

Then I told Netplan to hand off to NetworkManager. First I checked what file I had:

```bash
ls /etc/netplan/
```

Mine was `50-cloud-init.yaml`. Yours might be `01-netcfg.yaml`. I edited it:

```bash
sudo nano /etc/netplan/50-cloud-init.yaml
```

And made sure it contained:

```yaml
network:
  version: 2
  renderer: NetworkManager
```

Then:

```bash
sudo netplan apply
sudo systemctl enable --now NetworkManager
```

After that `sudo nmtui` worked, which is the text UI that comes with NetworkManager. No separate package needed. I picked Activate a connection, chose my SSID, entered the password, and it connected. You can do the same with `nmcli` if you prefer:

```bash
sudo nmcli radio wifi on
sudo nmcli device wifi list
sudo nmcli device wifi connect "YOUR_SSID" password "YOUR_PASSWORD"
```

`ip a` showed `wlan0` with an address, and `nmcli connection show` confirmed it. I unplugged the phone and wifi stayed up.

In hindsight I should have just started with NetworkManager. For a laptop that lives on wifi, systemd-networkd adds friction for no benefit.

### Making SSH reliable

DHCP kept moving the IP around, which meant my `ssh` command broke every reboot. I wanted one address I could remember.

There are three ways, and I tried two.

With `nmtui`, pick Edit a connection, choose your wifi connection, change IPv4 CONFIGURATION from Automatic to Manual, pick Show, and fill in Addresses `192.168.1.150/24`, Gateway `192.168.1.1`, DNS `192.168.1.1` or `8.8.8.8`. Save and reapply:

```bash
sudo nmcli connection up "YOUR_CONNECTION_NAME"
```

The same with `nmcli`:

```bash
sudo nmcli connection modify "MyWiFi" ipv4.addresses 192.168.1.150/24
sudo nmcli connection modify "MyWiFi" ipv4.gateway 192.168.1.1
sudo nmcli connection modify "MyWiFi" ipv4.dns "8.8.8.8,1.1.1.1"
sudo nmcli connection modify "MyWiFi" ipv4.method manual
sudo nmcli connection down "MyWiFi" && sudo nmcli connection up "MyWiFi"
```

For a home network the cleanest option is actually on the router. Log into `192.168.1.1` or `192.168.0.1`, find DHCP reservation, bind the laptop MAC to an IP. That way the laptop still asks for DHCP but always gets the same address, and you avoid an accidental conflict. I ended up doing it that way after testing the manual setting.

Either way, `ip addr show` now always shows the same address, and from my main laptop:

```bash
ssh username@192.168.1.150
```

just works.

### Putting Ollama on the HDD on purpose

LLM files are big. Even a small quantized model is a few GB, and they add up fast. I did not want the 500 GB SSD to fill up, so I put all models on the 1 TB drive.

Ollama itself installs in one line:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Then I made a place for models and gave it to the `ollama` user:

```bash
sudo mkdir -p /mnt/storage/ollama_models
sudo chown -R ollama:ollama /mnt/storage/ollama_models
```

To point Ollama there I edited the service:

```bash
sudo systemctl edit ollama.service
```

and added:

```
[Service]
Environment="OLLAMA_MODELS=/mnt/storage/ollama_models"
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

I started with small models because this CPU and GPU cannot handle much else:

```bash
ollama run llama3.2
ollama run qwen2.5-coder:1.5b
ollama run deepseek-r1:1.5b
```

If you want other devices on the LAN to reach Ollama, add `Environment="OLLAMA_HOST=0.0.0.0"` in the same service override and restart. By default it only listens on `127.0.0.1`.

This bit was uneventful, which I appreciated after the wifi detour.

### Open WebUI and a small Docker hiccup

I wanted a browser UI like ChatGPT that talks to the local models. Open WebUI with Docker is the easiest way.

Docker:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
```

Then Open WebUI:

```bash
docker run -d \
  --network=host \
  -v open-webui:/app/backend/data \
  -e OLLAMA_BASE_URL=http://127.0.0.1:11434 \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

I hit the classic permission error on the first try:

```
permission denied while trying to connect to the docker API at unix:///var/run/docker.sock
```

It just meant my shell had not picked up the `docker` group yet. `newgrp docker` fixed it in that shell, and prefixing with `sudo` works as a quick bypass. If it still fails after a fresh SSH login, check `sudo usermod -aG docker jinkya` and `sudo systemctl restart docker`.

Once the container was up, `ip a` gave me the server IP and I opened `http://<YOUR_SERVER_IP>:8080` from my phone on the same wifi. The first account becomes admin. Pick a model from the top dropdown and you can chat.

Handy checks when something feels off:

```bash
sudo docker ps
sudo docker logs -f open-webui
sudo docker restart open-webui
```

At this point I had a private AI box on the local network. It felt good, until I tried to be clever with the GPU.

### I thought the MX110 would help. It mostly did not.

The HP has an NVIDIA GeForce MX110, Maxwell, compute capability 5.0, 2 GB VRAM. On paper, any GPU should be faster than a low voltage laptop CPU. I wanted to measure it properly, same prompt on CPU and on GPU.

Driver was already there:

```bash
nvidia-smi
```

showed `580.173.02`, CUDA `13.0`, `GeForce MX110 0MiB / 2048MiB`. Running `sudo ubuntu-drivers install` said all drivers already installed, plus a harmless `aplay command not found` warning because that tool looks for an audio utility.

I made sure Ollama could see CUDA:

```bash
sudo systemctl restart ollama
ollama run qwen2.5-coder:1.5b --verbose
```

and in a second SSH window while it generated:

```bash
ollama ps
nvidia-smi
```

Same prompt both times: `Write a Python script to perform binary search on an array.`

CPU only:

```
total duration: 3m6.95s
prompt eval rate: 29.75 tokens/s
eval count: 617 tokens
eval rate: 3.34 tokens/s
```

With GPU enabled:

```
total duration: 1m49.17s
prompt eval rate: 6.82 tokens/s
eval count: 352 tokens
eval rate: 3.41 tokens/s
```

The total time was shorter only because it generated fewer tokens. Per token, 3.34 vs 3.41, basically identical.

Logs told the story:

```bash
journalctl -u ollama.service --no-pager | grep -i -E "gpu|cuda|detect|compute"
```

Repeated lines like:

```
skipping CUDA device - compute capability not in compiled architectures
  device="NVIDIA GeForce MX110" cc=500 archs="[750 800 860 870 890 900 1000 1030 1100 1200 1210]"
discovering available GPUs...
dropping integrated GPU; to enable, set OLLAMA_IGPU_ENABLE=1
  description="Intel(R) UHD Graphics 620 (KBL GT2)"
inference compute ... id=cpu ...
```

And when the model actually loaded:

```
load_tensors: offloaded 2/29 layers to GPU
load_tensors: offloaded 4/29 layers to GPU
```

That was the moment it clicked. The MX110 is compute 5.0, and the CUDA build Ollama ships expects 7.5 and newer. So Ollama skips the main CUDA path, falls back to a Vulkan or compatibility runner, and then can only squeeze 2 to 4 layers out of 29 into 2 GB after buffers. The rest stays on CPU. Shuffling tensors between RAM and VRAM for just those few layers costs more than it saves, so the eval rate stays stuck around 3.3 tokens per second.

You can force CPU only to compare cleanly:

```bash
sudo systemctl edit ollama.service
```

add:

```
[Service]
Environment="CUDA_VISIBLE_DEVICES="
```

then `sudo systemctl daemon-reload` and `sudo systemctl restart ollama`. Remove it with `sudo systemctl revert ollama.service`.

If you want to see the MX110 fully used, you need a tiny model that fits entirely in 2 GB:

```bash
ollama run qwen2.5:0.5b --verbose
```

and check:

```bash
journalctl -u ollama.service -n 20 --no-pager | grep "offloaded"
```

When it says `offloaded 29/29 layers to GPU`, it is all on the GPU. Even then, 0.5B is fast but limited.

### Threads did not save it either

I also tried tuning threads. This chip is 4 cores, 8 threads.

```bash
lscpu | grep -E "Core\(s\) per socket|Socket\(s\)"
```

I set:

```bash
sudo systemctl edit ollama.service
```

with:

```
[Service]
Environment="OLLAMA_NUM_THREADS=4"
```

then `sudo systemctl daemon-reload` and `sudo systemctl restart ollama`. Check with `journalctl -u ollama.service -n 30 --no-pager | grep "n_threads"` and look for `n_threads = 4`.

Result after the change: `3.39 tokens/s`. No real difference from `3.34` and `3.41` before. On this U-series CPU the limit is memory bandwidth, how fast DDR4 can feed weights to the cores, not thread count. Setting it to 8 was actually a bit slower for me, more context switching and heat.

### What I settled on

For 1.5B to 3B models I just run CPU now. Offloading 2 layers to the MX110 is not worth the overhead on this card.

For everyday use I reach for smaller models that fit better in cache and need less bandwidth:

```bash
ollama run qwen2.5:0.5b --verbose
ollama run smollm2:360m --verbose
ollama run llama3.2:1b --verbose
```

Those give 15 to 50 tokens per second on this laptop instead of 3, and answers come back in seconds, not minutes. I kept `OLLAMA_NUM_THREADS=4` because it runs cooler and does not throttle as quickly.

The MX110 is still fine for display, but for current Ollama builds it is too old to help with LLM inference. The bigger win was picking a smaller quantized model and keeping the models on the HDD so the SSD stays clean.

If you have a similar old laptop, that is the setup I would start with: Ubuntu Server, NetworkManager for wifi, a reserved IP on the router, Ollama with `OLLAMA_MODELS` on a second disk, Docker plus Open WebUI, and modest expectations for the old NVIDIA card.
