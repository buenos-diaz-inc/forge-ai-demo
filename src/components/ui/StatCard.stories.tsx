import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatCard } from "./StatCard";
import { CurrencyDollar, ChartBar, Users, ShoppingCart } from "@medusajs/icons";

const meta: Meta<typeof StatCard> = {
  title: "UI/StatCard",
  component: StatCard,
  argTypes: {
    change: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof StatCard>;

export const PositiveTrend: Story = {
  args: {
    title: "Total Revenue",
    value: "$45,231",
    change: 12.5,
    changeLabel: "vs last month",
    icon: CurrencyDollar,
  },
};

export const NegativeTrend: Story = {
  args: {
    title: "Churn Rate",
    value: "3.2%",
    change: -0.8,
    changeLabel: "vs last month",
    icon: ChartBar,
  },
};

export const NoChange: Story = {
  args: {
    title: "Active Users",
    value: "2,420",
    icon: Users,
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4" style={{ maxWidth: 640 }}>
      <StatCard title="Revenue" value="$45,231" change={12.5} changeLabel="vs last month" icon={CurrencyDollar} />
      <StatCard title="Orders" value="1,205" change={-2.3} changeLabel="vs last month" icon={ShoppingCart} />
      <StatCard title="Users" value="2,420" change={8.1} changeLabel="vs last month" icon={Users} />
      <StatCard title="Accuracy" value="94.2%" icon={ChartBar} />
    </div>
  ),
};
