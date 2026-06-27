import type {
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
    enable: false,
    src: 'assets/images/demo-banner.png',
    position: 'center',
    credit: {
      enable: false,
      text: '',
      url: '',
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
  avatar: 'assets/images/avatar.png',
  name: 'Comet',
  bio: '月 | 这里是 @HComet彗星 的个人博客',
  links: [
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/Meteor-Comet',
    },
    {
      name: '知乎',
      icon: 'fa6-brands:zhihu',
      url: 'https://www.zhihu.com/people/assassin-64-87',
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
