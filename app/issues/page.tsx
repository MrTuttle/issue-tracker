// app/issue/page.tsx

import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const issues = () => {
  return (
    <Button>
      <Link href="/issues/new">New Issue</Link>
    </Button>
  );
};

export default issues;
