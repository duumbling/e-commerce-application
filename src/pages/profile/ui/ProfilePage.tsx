import React from "react";

// import {} from "./style";

import { Header } from "../../../shared/ui/Header";
import BonusesList from "../../../widgets/bonuses-list/ui/BonusesList";
import { ProfileForm } from "../../../widgets/profile-form/ui/ProfileForm";

export function ProfilePage() {
  return (
    <div>
      <Header>Profile page</Header>
      <BonusesList />
      <ProfileForm />
    </div>
  );
}
