import React from "react";
import { Grid, Stack } from "@mui/material";
import { Logo } from "../../shared/ui/Logo";
import { Link } from "../../shared/ui/Link";
import { Paths } from "../../shared/constants/paths";
import { ThemeColors } from "../../shared/constants/colors";

interface SocialLink {
  href: string;
  title: string;
}

const socialLinks: SocialLink[] = [
  { href: "https://youtube.com", title: "YouTube" },
  { href: "https://instagram.com", title: "Instagram" },
  { href: "https://facebook.com", title: "Facebook" },
  { href: "https://vk.com", title: "ВКонтакте" },
];

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
        <Logo />
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
    </Grid>
  );
}
