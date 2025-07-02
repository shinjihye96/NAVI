'use client';

import DailyShare from "@/(page)/(daily)/daily_share/page";
import { Button, IconButton, TextButton } from "components/ui/button/page";
import Chips from "components/ui/chip/page";
import Input from "components/ui/input/page";
import Search from "components/ui/searchBar/page";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState('')
  return (
    <main>
      <DailyShare />
    </main>
  )
}
