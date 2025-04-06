'use client';

import { Button, IconButton, TextButton } from "components/ui/button/page";
import Chips from "components/ui/chip/page";
import Input from "components/ui/input/page";
import Search from "components/ui/searchBar/page";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState('')
  return (
    <main>
      <Search
        value={value}
        name="search"
        onChange={() => {}}
      />
      <Input
        label="label"
        name="vlue"
        value="dmdpdpd"
        onChange={() => {}}      
      />
      <Input
        label="label"
        name="vlue"
        value="dmdpdpd"
        type="line"
        onChange={() => {}}      
      />
      <Input
        label="label"
        name="vlue"
        value="dmdpdpd"
        type="noLine"
        onChange={() => {}}      
      />
    </main>
  )
}
