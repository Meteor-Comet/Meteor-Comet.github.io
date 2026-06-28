import type {
  ExpressiveCodeConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Comet Blog',
  subtitle: '与你一起发现更大的世界',
  lang: 'zh_CN',
  themeColor: {
    hue: 250,         // 蓝紫色调
    fixed: false,
  },
  banner: {
    enable: true,
    src: '/images/banner-evening-breeze.png',
    position: 'center',
    credit: {
      enable: true,
      text: 'evening breeze / Taizo',
      url: 'https://www.pixiv.net/artworks/115315413',
    },
  },
  toc: {
    enable: true,
    depth: 2,
  },
  favicon: [
    // 可在此添加自定义 favicon
  ],
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/Meteor-Comet',
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: '/images/一日の終わり.jpg',
  name: 'Comet',
  bio: '风|鸟|花|月',
  links: [
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/Meteor-Comet',
    },
    {
      name: 'Steam',
      icon: 'fa6-brands:steam',
      url: 'https://steamcommunity.com/id/513578967/',
    },
    {
      name: 'Twitter',
      icon: 'fa6-brands:twitter',
      url: 'https://twitter.com/z1nrLvL8PTosZYH',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  theme: 'github-dark',
}

