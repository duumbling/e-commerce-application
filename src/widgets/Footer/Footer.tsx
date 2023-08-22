import React from "react";
import { Grid, Stack } from "@mui/material";
import {
  SocialButton,
  type SocialButtonProps,
} from "../../shared/ui/SocialButton";
import {
  iconFacebook,
  iconSignal,
  iconSkype,
  iconTelegram,
  iconVK,
  iconViber,
} from "../../shared/ui/assets/icons/social";
import { Logo } from "../../shared/ui/Logo";
import { Link } from "../../shared/ui/Link";
import { Paths } from "../../shared/constants/paths";
import { ThemeColors } from "../../shared/constants/colors";
import { socialButtonStyle } from "./style";

interface SocialLink {
  href: string;
  title: string;
}

const socialData: SocialButtonProps[] = [
  { href: "https://viber.com", icon: iconViber },
  { href: "https://skype.com", icon: iconSkype },
  { href: "https://signal.org", icon: iconSignal },
  { href: "https://web.telegram.org", icon: iconTelegram },
  { href: "https://facebook.com", icon: iconFacebook },
  { href: "https://vk.com", icon: iconVK },
];
const socialLinks: SocialLink[] = [
  { href: "https://youtube.com", title: "YouTube" },
  { href: "https://instagram.com", title: "Instagram" },
  { href: "https://facebook.com", title: "Facebook" },
  { href: "https://vk.com", title: "ВКонтакте" },
];

const socialButtons = socialData.map((data) => (
  <SocialButton key={data.href} sx={socialButtonStyle.iconButton} {...data} />
));

const socialLinkItems = socialLinks.map(({ href, title }) => (
  <Grid item key={href} xs={6}>
    <Link href={href} color={ThemeColors.GREY}>
      {title}
    </Link>
  </Grid>
));

export function Footer() {
  return (
    <Grid component={"footer"}>
      <Grid item>
        <Stack direction="row">
          <Logo />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            flex={1}
            flexWrap="wrap"
            gap="1rem"
            useFlexGap
          >
            <Link href={Paths.NotFound} fontWeight="bold">
              Калорийность и состав
            </Link>
            <Link href={Paths.NotFound} fontWeight="bold">
              Правовая информация
            </Link>
          </Stack>
        </Stack>
      </Grid>
      <Grid container item my={2}>
        <Grid container item spacing={2} xs={8}>
          {socialLinkItems}
        </Grid>
        <Grid item xs={4}>
          <Link href={Paths.Main} color={ThemeColors.GREY}>
            <Stack spacing={2} useFlexGap>
              <span>Москва ул. Проспект</span>
              <span>Вернадского 86В</span>
            </Stack>
          </Link>
        </Grid>
      </Grid>
      <Grid item>
        <Stack direction="row" flexWrap="wrap" spacing={2} useFlexGap>
          {socialButtons}
          <SocialButton
            href={Paths.Main}
            text="Написать нам"
            sx={socialButtonStyle.textButton}
          ></SocialButton>
        </Stack>
      </Grid>
    </Grid>
  );
}
