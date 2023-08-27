import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  SocialButton,
  type SocialButtonProps,
} from "../../shared/ui/SocialButton";
import { Logo } from "../../shared/ui/Logo";
import { Link } from "../../shared/ui/Link";
import { Paths } from "../../shared/constants/paths";
import { ThemeColors } from "../../shared/constants/colors";
import {
  footerContainerStyleProps,
  footerLinksInfoContainerStyleProps,
  footerLinksContainerStyleProps,
  footerLogoContainerStyleProps,
  paymentIconStyleProps,
  socialButtonStyle,
  footerLinksSocialContainerStyleProps,
  footerLinksSocialAddressContainerStyleProps,
  footerContactsContainerStyleProps,
  footerContactsTitleStyleProps,
  footerContactsPhoneNumberStyleProps,
  footerContactsSocialButtonsContainerStyleProps,
  footerContactsInfoContainerStyleProps,
  footerContactsPaymentContainerStyleProps,
  footerLinksSocialStyleProps,
  footerLinksSocialSubContainerStyleProps,
  footerLinksSocialAddressSubContainerStyleProps,
  socialLinkStyleProps,
  footerContactsSubContainerStyleProps,
} from "./style";
import { paymentIcons, socialIcons } from "../../shared/ui/assets/icons";
import { bgIconCenter } from "../../shared/lib/helpers/styles";

interface SocialLink {
  href: string;
  title: string;
}

const socialData: SocialButtonProps[] = [
  { href: "https://viber.com", icon: socialIcons.iconViber },
  { href: "https://skype.com", icon: socialIcons.iconSkype },
  { href: "https://signal.org", icon: socialIcons.iconSignal },
  { href: "https://web.telegram.org", icon: socialIcons.iconTelegram },
  { href: "https://facebook.com", icon: socialIcons.iconFacebook },
  { href: "https://vk.com", icon: socialIcons.iconVK },
];
const socialLinks: SocialLink[] = [
  { href: "https://youtube.com", title: "YouTube" },
  { href: "https://instagram.com", title: "Instagram" },
  { href: "https://facebook.com", title: "Facebook" },
  { href: "https://vk.com", title: "ВКонтакте" },
];

const paymentIconItems = Object.values(paymentIcons).map((icon) => (
  <Box key={icon} {...paymentIconStyleProps} sx={bgIconCenter(icon)} />
));

const socialButtons = socialData.map((data) => (
  <SocialButton key={data.href} sx={socialButtonStyle.iconButton} {...data} />
));

const socialLinkItems = socialLinks.map(({ href, title }) => (
  <Grid item key={href} {...socialLinkStyleProps.container}>
    <Link href={href} {...socialLinkStyleProps.link}>
      {title}
    </Link>
  </Grid>
));

export function Footer() {
  return (
    <Grid container component={"footer"} {...footerContainerStyleProps}>
      <Grid container item {...footerLogoContainerStyleProps}>
        <Grid item>
          <Logo />
        </Grid>
      </Grid>

      <Grid container item {...footerLinksContainerStyleProps}>
        <Stack {...footerLinksInfoContainerStyleProps}>
          <Link href={Paths.NotFound} {...footerLinksSocialStyleProps}>
            О нас
          </Link>
          <Link href={Paths.NotFound} {...footerLinksSocialStyleProps}>
            Правовая информация
          </Link>
        </Stack>
        <Grid container item {...footerLinksSocialContainerStyleProps}>
          <Grid container item {...footerLinksSocialSubContainerStyleProps}>
            {socialLinkItems}
          </Grid>
          <Grid item {...footerLinksSocialAddressContainerStyleProps}>
            <Link href={Paths.NotFound} color={ThemeColors.GREY}>
              <Stack {...footerLinksSocialAddressSubContainerStyleProps}>
                <span>Москва ул. Проспект</span>
                <span>Вернадского 86В</span>
              </Stack>
            </Link>
          </Grid>
        </Grid>
      </Grid>

      <Grid item {...footerContactsContainerStyleProps}>
        <Stack {...footerContactsSubContainerStyleProps}>
          <Typography component={"span"} {...footerContactsTitleStyleProps}>
            Остались вопросы? А мы всегда на связи:
          </Typography>
          <Link href="tel:88005553535" {...footerContactsPhoneNumberStyleProps}>
            8 800 555-35-35
          </Link>
        </Stack>
        <Stack {...footerContactsSocialButtonsContainerStyleProps}>
          {socialButtons}
          <SocialButton href={Paths.NotFound} sx={socialButtonStyle.textButton}>
            Написать нам
          </SocialButton>
        </Stack>
        <Stack {...footerContactsInfoContainerStyleProps}>
          <Typography component="span">
            RSS Все права защищены © 2023
          </Typography>
          <Stack {...footerContactsPaymentContainerStyleProps}>
            {paymentIconItems}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
