import { useState } from "react";
import { Button, Input, Tabs, Table, Badge, Label } from "@medusajs/ui";
import { PlusMini } from "@medusajs/icons";
import type { ColDef } from "ag-grid-community";
import { AnimatedPage } from "@/components/ui/AnimatedPage";
import { ForgeAvatar } from "@/components/ui/ForgeAvatar";
import { PageShell } from "@/components/layout/PageShell";
import { ForgeGrid } from "@/components/data-grid/ForgeGrid";
import { StatusCellRenderer } from "@/components/data-grid/cellRenderers/StatusCellRenderer";
import { AvatarCellRenderer } from "@/components/data-grid/cellRenderers/AvatarCellRenderer";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { BarChart } from "@/components/charts/BarChart";
import { formatDate } from "@/lib/utils";
import { FORGE_COLORS } from "@/lib/constants";
import { teamMembers, apiKeys, billingData, notificationPrefs } from "./data/settings-data";
import type { TeamMember, ApiKey } from "@/data/types";

const teamColumnDefs: ColDef<TeamMember>[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    cellRenderer: AvatarCellRenderer,
  },
  { field: "email", headerName: "Email", flex: 1.5 },
  { field: "role", headerName: "Role", width: 120 },
  { field: "status", headerName: "Status", width: 120, cellRenderer: StatusCellRenderer },
  {
    field: "joinedAt",
    headerName: "Joined",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
];

const apiKeyColumnDefs: ColDef<ApiKey>[] = [
  { field: "name", headerName: "Name", flex: 1.5 },
  { field: "prefix", headerName: "Key", width: 160, cellClass: "font-mono" },
  { field: "status", headerName: "Status", width: 120, cellRenderer: StatusCellRenderer },
  {
    field: "createdAt",
    headerName: "Created",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
  {
    field: "lastUsed",
    headerName: "Last Used",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
];

export function SettingsPage() {
  const [name, setName] = useState("Brayden Love");
  const [email, setEmail] = useState("brayden@forge.ai");

  return (
    <AnimatedPage>
      <PageShell title="Settings" description="Manage your account, team, and preferences.">
        <Tabs defaultValue="profile">
          <Tabs.List>
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
            <Tabs.Trigger value="team">Team</Tabs.Trigger>
            <Tabs.Trigger value="api-keys">API Keys</Tabs.Trigger>
            <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
            <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="profile">
            <div className="mt-4 max-w-lg space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <ForgeAvatar name={name} size="lg" />
                <div>
                  <p className="text-lg font-semibold text-ui-fg-base">{name}</p>
                  <p className="text-sm text-ui-fg-muted">Admin</p>
                </div>
              </div>
              <div>
                <Label htmlFor="name" className="text-ui-fg-base">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email" className="text-ui-fg-base">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
              </div>
              <Button variant="primary" size="small">Save Changes</Button>
            </div>
          </Tabs.Content>

          <Tabs.Content value="team">
            <div className="mt-4">
              <div className="mb-4 flex justify-end">
                <Button variant="primary" size="small">
                  <PlusMini className="h-4 w-4" />
                  Invite Member
                </Button>
              </div>
              <ForgeGrid<TeamMember>
                rowData={teamMembers}
                columnDefs={teamColumnDefs}
                height={400}
                pagination={false}
              />
            </div>
          </Tabs.Content>

          <Tabs.Content value="api-keys">
            <div className="mt-4">
              <div className="mb-4 flex justify-end">
                <Button variant="primary" size="small">
                  <PlusMini className="h-4 w-4" />
                  Create API Key
                </Button>
              </div>
              <ForgeGrid<ApiKey>
                rowData={apiKeys}
                columnDefs={apiKeyColumnDefs}
                height={350}
                pagination={false}
              />
            </div>
          </Tabs.Content>

          <Tabs.Content value="notifications">
            <div className="mt-4 rounded-xl border border-ui-border-base overflow-hidden">
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>In-App</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {notificationPrefs.map((pref) => (
                    <Table.Row key={pref.category}>
                      <Table.Cell className="font-medium">{pref.category}</Table.Cell>
                      <Table.Cell className="text-ui-fg-muted">{pref.description}</Table.Cell>
                      <Table.Cell>
                        <Badge color={pref.email ? "green" : "grey"} size="small">
                          {pref.email ? "On" : "Off"}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge color={pref.inApp ? "green" : "grey"} size="small">
                          {pref.inApp ? "On" : "Off"}
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Tabs.Content>

          <Tabs.Content value="billing">
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {[
                  { label: "Current Plan", value: "Enterprise" },
                  { label: "GPU Hours This Month", value: "2,847" },
                  { label: "Monthly Budget", value: "$12,500" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-ui-border-base bg-ui-bg-base p-4">
                    <p className="text-xs text-ui-fg-muted">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold text-ui-fg-base">{item.value}</p>
                  </div>
                ))}
              </div>
              <ChartContainer
                title="GPU Hours by Month"
                description="Compute usage over the last 6 months"
                height={280}
              >
                <BarChart
                  data={billingData}
                  keys={["hours"]}
                  indexBy="month"
                  colors={[FORGE_COLORS[0]]}
                />
              </ChartContainer>
            </div>
          </Tabs.Content>
        </Tabs>
      </PageShell>
    </AnimatedPage>
  );
}
