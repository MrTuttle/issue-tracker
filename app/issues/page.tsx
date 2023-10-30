// app/issue/page.tsx

import React from "react";
import { Table, TableCell, Text } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
// import Link from "next/link";
import prisma from "@/prisma/client";
// delay to see skeletons and loadings
import delay from "delay";
import IssueActions from "./IssueActions";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

const issuesPage = async ({ searchParams }: Props) => {
  // console.log(searchParams.status);

  // await delay(1000);

  // store statuses
  const statuses = Object.values(Status);
  // console.log("my statuses :" + statuses);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const session = await getServerSession(authOptions);

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });
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
