---
title: 'Ubuntu Server 26.04 on an HP 17 da0077tx: wifi, static IP, Ollama, and testing the MX110'
date: '2026-09-01'
categories:
  - Programming
---

I put Ubuntu Server 26.04 on my HP 17 da0077tx. The laptop has a 500 GB SSD where I installed the OS and a 1 TB HDD mounted at `/mnt/storage`. I also wanted to run local models with Ollama and Open WebUI, and see if the NVIDIA MX110 helps at all. This is the full sequence, including the parts where it did not work as expected.

### The machine

HP 17 da0077tx. 8th gen Intel Core i5-8250U or i7-8550U in this series, 4 physical cores and 8 threads, Intel UHD Graphics 620, NVIDIA GeForce MX110 with 2 GB VRAM. Ubuntu Server 26.04 LTS on the 500 GB SSD. `/mnt/storage` is the 1 TB HDD.

### Installing Ubuntu Server

You need an 8 GB or larger USB drive and a tool like Rufus on Windows or BalenaEtcher on macOS or Linux.

Download the Ubuntu Server 26.04 LTS ISO from the official download page. Flash it to the USB drive. On HP, shut the laptop down, press power and tap F10 repeatedly to get into BIOS Setup. Under System Configuration then Boot Options, set Secure Boot to Disabled and make sure USB Boot is Enabled. Save and exit.

Plug in the USB, power on, tap F9 repeatedly for the Boot Menu, pick the USB drive, and on the GRUB screen pick Try or Install Ubuntu Server.

The installer is straightforward. Pick language and keyboard, let the network get an address over DHCP if you have Ethernet plugged in, leave proxy and mirror on defaults unless you need a proxy, and for storage pick Use an entire disk. I left LVM enabled. Then create your name, server name, username and password. Check Install OpenSSH Server so you can SSH in later. You can skip extra snaps or add Docker and others if you want. When it finishes, pick Reboot Now, remove the USB when prompted, and press Enter. A wired connection helps here because wifi during Server install is unreliable.

### Wifi did not work after install

Ubuntu Server uses systemd-networkd by default. It does not come with nmcli or nmtui, so wifi is awkward.

I used USB tethering from my phone to get temporary internet, then switched the backend to NetworkManager.

First, with the phone plugged in and USB tethering enabled:

```bash
sudo apt update
sudo apt install network-manager wpasupplicant
```

Then tell Netplan to use NetworkManager. List the files in `/etc/netplan`:

```bash
ls /etc/netplan/
```

Edit the main YAML file. Mine was `50-cloud-init.yaml` but yours may be `01-netcfg.yaml` or similar:

```bash
sudo nano /etc/netplan/50-cloud-init.yaml
```

Make sure the file has:

```yaml
network:
  version: 2
  renderer: NetworkManager
```

Save, exit, then apply and enable the service:

```bash
sudo netplan apply
sudo systemctl enable --now NetworkManager
```

Now you can connect to wifi.

The easiest way on Server is the text UI that comes with NetworkManager:

```bash
sudo nmtui
```

Pick Activate a connection, choose your SSID, enter the password, and activate. You can also do it directly with nmcli:

```bash
sudo nmcli radio wifi on
sudo nmcli device wifi list
sudo nmcli device wifi connect "YOUR_SSID" password "YOUR_PASSWORD"
```

Check with `ip a` or `nmcli connection show`. Once wifi has an address you can unplug the phone. `nmtui` is part of the `network-manager` package, so there is no extra install for the TUI itself.

### Getting a static IP so SSH is stable

To SSH in reliably you want the same address after every reboot. There are three ways to do it.

In nmtui: run `sudo nmtui`, pick Edit a connection, pick your wifi or Ethernet connection, change IPv4 CONFIGURATION from Automatic to Manual, pick Show, then fill in Addresses like `192.168.1.150/24`, Gateway like `192.168.1.1`, and DNS like `192.168.1.1` or `8.8.8.8`. Save, exit, then reapply:

```bash
sudo nmcli connection up "YOUR_CONNECTION_NAME"
```

With nmcli directly:

```bash
sudo nmcli connection modify "MyWiFi" ipv4.addresses 192.168.1.150/24
sudo nmcli connection modify "MyWiFi" ipv4.gateway 192.168.1.1
sudo nmcli connection modify "MyWiFi" ipv4.dns "8.8.8.8,1.1.1.1"
sudo nmcli connection modify "MyWiFi" ipv4.method manual
sudo nmcli connection down "MyWiFi" && sudo nmcli connection up "MyWiFi"
```

Or do it on the router. Log into your router at `192.168.1.1` or `192.168.0.1`, find DHCP Address Reservation, and bind the laptop MAC to an IP. This avoids conflicts if two devices pick the same static address.

Verify with `ip addr show` and from another machine on the same network:

```bash
ssh username@192.168.1.150
```

### Ollama with models on the HDD

LLM weights are large, 4 GB to 40 GB per model, so I did not want them on the OS SSD. I pointed Ollama at the HDD.

Install Ollama:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Make a directory on the HDD and give ownership to the `ollama` user:

```bash
sudo mkdir -p /mnt/storage/ollama_models
sudo chown -R ollama:ollama /mnt/storage/ollama_models
```

Tell systemd where to store models:

```bash
sudo systemctl edit ollama.service
```

Add:

```
[Service]
Environment="OLLAMA_MODELS=/mnt/storage/ollama_models"
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

Pull something small. The MX110 and this CPU are not fast, so 1B to 3B quantized models are the only ones that feel usable:

```bash
ollama run llama3.2
ollama run qwen2.5-coder:1.5b
ollama run deepseek-r1:1.5b
```

If you want other machines on the LAN to reach Ollama, expose it. Edit the same service file again, add `Environment="OLLAMA_HOST=0.0.0.0"` under `[Service]`, then `sudo systemctl restart ollama`. By default it only listens on 127.0.0.1.

### Docker and Open WebUI

Open WebUI gives you a ChatGPT-like UI that talks to your local Ollama.

Install Docker:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
```

Run Open WebUI linked to the host Ollama:

```bash
docker run -d \
  --network=host \
  -v open-webui:/app/backend/data \
  -e OLLAMA_BASE_URL=http://127.0.0.1:11434 \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

If you get:

```
permission denied while trying to connect to the docker API at unix:///var/run/docker.sock
```

it means your current shell has not picked up the `docker` group yet. Run `newgrp docker` and try again, or prefix with `sudo` as a quick workaround. If it still fails after a new SSH session, make sure you were added correctly with `sudo usermod -aG docker jinkya` and restart Docker with `sudo systemctl restart docker`.

Once the container is up, find the server IP with `ip a`, then open `http://<YOUR_SERVER_IP>:8080` from any device on the same wifi. The first account you create becomes admin. Pick a model from the dropdown at the top and start chatting.

Useful checks:

```bash
sudo docker ps
sudo docker logs -f open-webui
sudo docker restart open-webui
```

### Trying to use the MX110

The MX110 is Maxwell, compute capability 5.0, 2 GB VRAM. My hope was to get some acceleration, even if not all layers fit.

First, check the driver:

```bash
nvidia-smi
```

Mine showed:

```
NVIDIA-SMI 580.173.02   Driver Version: 580.173.02   CUDA Version: 13.0
GeForce MX110   0MiB / 2048MiB
```

Driver was already installed. The `aplay command not found` message from `sudo ubuntu-drivers install` is harmless. It is just the driver tool looking for an audio utility.

Restart Ollama so it probes for CUDA:

```bash
sudo systemctl restart ollama
ollama run qwen2.5-coder:1.5b --verbose
```

In another SSH session while it generates:

```bash
ollama ps
nvidia-smi
```

I sent the same prompt both times for comparison: `Write a Python script to perform binary search on an array.`

CPU only gave:

```
total duration: 3m6.95s
prompt eval rate: 29.75 tokens/s
eval count: 617 tokens
eval rate: 3.34 tokens/s
```

With the GPU enabled the run was:

```
total duration: 1m49.17s
prompt eval rate: 6.82 tokens/s
eval count: 352 tokens
eval rate: 3.41 tokens/s
```

Same speed per token. The second run was shorter only because it generated fewer tokens.

Logs explained it:

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

And later when a model actually loaded:

```
load_tensors: offloaded 2/29 layers to GPU
load_tensors: offloaded 4/29 layers to GPU
```

Ollama skipped the MX110 for its main CUDA path because 5.0 is not in the compiled arch list, fell back to Vulkan or a compatibility runner, and then could only fit 2 to 4 layers out of 29 into 2 GB after buffers and overhead. The rest stayed on CPU. Moving tensors between RAM and VRAM for just a few layers added overhead that canceled any gain. That is why the eval rate stayed around 3.3 to 3.4 tokens per second.

Forcing CPU only looks like this. Edit the override:

```bash
sudo systemctl edit ollama.service
```

Add:

```
[Service]
Environment="CUDA_VISIBLE_DEVICES="
```

Then `sudo systemctl daemon-reload` and `sudo systemctl restart ollama`. To undo, `sudo systemctl revert ollama.service` and restart again.

If you really want to see the MX110 fully used, pull a tiny model that fits entirely in 2 GB:

```bash
ollama run qwen2.5:0.5b --verbose
```

Check offload in the same way:

```bash
journalctl -u ollama.service -n 20 --no-pager | grep "offloaded"
```

When it says `offloaded 29/29 layers to GPU`, that model is running on the GPU. Even then, 0.5B is quick but not very capable.

### Threads

I also tried tuning `OLLAMA_NUM_THREADS`. On this laptop it is 4 physical cores, 8 threads.

Check:

```bash
lscpu | grep -E "Core\(s\) per socket|Socket\(s\)"
```

Set:

```bash
sudo systemctl edit ollama.service
```

Add:

```
[Service]
Environment="OLLAMA_NUM_THREADS=4"
```

Then `sudo systemctl daemon-reload` and `sudo systemctl restart ollama`. Verify with `journalctl -u ollama.service -n 30 --no-pager | grep "n_threads"` and look for `n_threads = 4`.

It did not change the rate. Another run after setting threads to 4 was `3.39 tokens/s`, basically the same as before. On this low voltage CPU the bottleneck is memory bandwidth, how fast DDR4 can feed weights to the cores, not thread count. Setting threads to 8 can even make it slower from context switching and heat.

### What I actually use now

For 1.5B to 3B models I leave the MX110 out of it and run CPU only. The hybrid offload of 2 layers is not worth it. For daily chat I use smaller models:

```bash
ollama run qwen2.5:0.5b --verbose
ollama run smollm2:360m --verbose
ollama run llama3.2:1b --verbose
```

Those get 15 to 50 tokens per second on this hardware instead of 3, and responses come back in seconds. `OLLAMA_NUM_THREADS=4` stays as the setting to avoid thermal throttling.

The MX110 works fine for display, but for modern Ollama builds it is too old to be useful for LLM inference. The CPU does most of the work, so picking a smaller quantized model matters more than any driver tweak.
