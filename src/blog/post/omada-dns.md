---
title: Omada DNS
description: Break web filters and Hapara by changing DNS
dateText: Feb 13, 2024
thumbnail: /assets/uploads/screenshot-2024-02-10-12.50.23-pm.png
---
After Insecurly got patched, the situation was truly dire at my school. Game sites were blocked. Sites for class were blocked. Even Github, for some reason, was blocked. But everything changed when the custom DNS nation attacked...

Suddenly, we were free to go wherever and do whatever we want. It was pure freedom! And, if I'm being honest, this exploit was even better than Insecurly, mainly because it broke Hapara. For the first time, we could say goodbye to random screenshots and lost work from force-closed tabs! And now, you're in the right place to experience this newfound power.

## Tutorial

There are two main paths you can go down here. One is useful if the network is managed and forced onto your Chromebook (like school WiFi), and the other, easier one is for personal, unmanaged networks (like your home WiFi). The best way to tell a managed network from unmanaged is to check if the network has a "building" icon next to it. If it does, it's managed. If you've used caub before (it's okay if you don't know what that is), your managed network might show as unmanaged. You should be able to follow the steps for personal networks. But when in doubt, or if you're blocked from changing DNS settings, go with the managed route.

### For managed networks

Before you start, you need to get some information about your network. Here are the steps to follow:

1. Go to chrome://network#state
2. Scroll to `Favorite Networks` and find the managed network
3. Click it to expand, and copy all the text that appears between the `{brackets}`
4. Go to the [DNS editor](/projects/caubdns)
   * Disable `enable metered (update blocker)`
   * Enable `edit dns`
   * Type `167.86.91.171` into the first box, set the rest to `0.0.0.0`
   * In the small text box near the bottom, paste the block of text you copied earlier.
   * Click `generate and download file`
5. Go to chrome://network
6. Scroll to the bottom and click `Choose File`
7. Choose the file that was downloaded earlier
8. Restart your Chromebook

### For unmanaged networks

You're lucky! These steps will be much easier for you because you won't be blocked from managing DNS settings.
1. Go to Settings > Wi-Fi > [your network name]
2. Expand the `Network` section
3. Scroll to `Name servers`
4. Click on `Custom name servers` (if it's not already selected)
5. Type `167.86.91.171` into the first box, set the rest to `0.0.0.0`
6. Restart your Chromebook

After you follow these steps, web filters and Hapara should be broken as promised! Some sites may still be blocked by Chrome's URL blacklist or a filter built into school WiFi, but for the most part, it's like having Insecurly back again. Go enjoy the unblocked internet!

Oh, and there's one last thing that you **need** to know, so *please* read this section too! The DNS server we're using might not last forever. It could be blocked by school administrators, your router at home, or the owners might just run out of money to keep it running. In that case, you may be cut off entirely from the internet, as your computer won't be able to reach the server to resolve domain names. If you suddenly can't reach any websites or experience any other problems, and you've tried other troubleshooting steps like restarting your computer, you can fix the problem by following the steps for unmanaged networks, up to the point where you click `Custom name servers`. Instead of that, click `Automatic name servers`, restart your Chromebook, and you should be able to reach the internet again. To get the exploit working again, just follow the steps for **unmanaged** networks. If your network was managed before, it won't appear that way after following this exploit, and you'll be able to activate and deactivate the exploit at will. For real this time, that's all you need to know.
