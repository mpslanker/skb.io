+++
title = 'Talos + Kubernetes Home Lab'
date =  '2025-06-08T23:38:28Z'
authors = ['mslanker']
description = 'Setting up a 2-node Kubernetes cluster using Talos Linux in a home lab environment for learning and experimentation.'
draft = false

# Project-specific front matter
projectType = 'infrastructure'
status = 'in-progress'
technologies = ['kubernetes', 'talos', 'proxmox', 'containers']
github = ''
demo = ''

categories = ['Projects']
tags = ['kubernetes', 'talos', 'homelab', 'devops', 'containers', 'proxmox', 'infrastructure']
+++

I have been marginally interested in Kubernetes for a while.  Howewver, I am often turned off when something because a buzzword and not as likely to delve into.  That's a me problem for sure but I think I am finally ready to take a crack at getting a k8s cluster stood up in my home lab and see what I have been missing.

## The Plan
Stand up a 2 node k8s cluster to get my feet wet.  Get some of the basics down regarding persistent storage, service discovery, etc. and decide where to go from there.  We will start by creating 2 VMs in Proxmox that will used as nodes for this k8s cluster.  One will be the control plane and the other will be the worker.  Nothing too fancy here.  VMs will have 2 vCPUs and 2GB of RAM with 32GB of storage.  We will be running Talos Linux and I will be documenting my journey below.

## The Journey
Since I have tried to do this a number of times, I am erasing pretty much everything I have done thus far.  I don't want to be that guy that write a tutorial and magically things are just there.  We can go step by step.  However, I cannot start from the beginning of setting up Proxmox.  So I will at least assume you have a hypervisor you are comfortable using and get 2 VMs up and running.  Whether you using templates or something else to do it should not make a difference.  I will try to provide as much detail as I can so that ideally anyone can follow along.

Our first order of business is to get the installation media.  It appears we have two options for doing so.