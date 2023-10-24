// app/issue/page.tsx

import React from "react";
import { Table, TableCell } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
// import Link from "next/link";
import prisma from "@/prisma/client";
// delay to see skeletons and loadings
import delay from "delay";
import IssueActions from "./IssueActions";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const issuesPage = async () => {
  await delay(1000);
  const session = await getServerSession(authOptions);

  const issues = await prisma.issue.findMany();
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {session && <IssueActions />}
    </div>
  );
};

export default issuesPage;
