import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartConfig = {
  product: {
    label: 'Product',
    color: 'hsl(var(--chart-1))',
  },
  component: {
    label: 'Component',
    color: 'hsl(var(--chart-2))',
  },
  both: {
    label: 'Both',
    color: 'hsl(var(--chart-3))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig

interface ComponentProps {
  categories: CategoryType[]
}

export function CategoryTypeBarChart({ categories }: ComponentProps): JSX.Element {
  // Prepare data for the chart
  const chartData = [
    { categoryType: 'For Product', count: categories.filter((c) => c.isForProduct).length, fill: 'hsl(var(--chart-2))' },
    { categoryType: 'For Component', count: categories.filter((c) => c.isForComponent).length, fill: 'hsl(var(--chart-1))' },
    { categoryType: 'For Both', count: categories.filter((c) => c.isForProduct && c.isForComponent).length, fill: 'hsl(var(--chart-3))' },
    { categoryType: 'Total', count: categories.length, fill: 'hsl(var(--foreground))' },
  ]

  return (
    <Card className='shadow-none border-none'>
      <CardHeader>
        <CardTitle>Bar Chart - Categories Distribution</CardTitle>
        <CardDescription>Showing the distribution of categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-40 w-full'>
          <BarChart accessibilityLayer data={chartData} layout='vertical' margin={{ right: 16 }}>
            <CartesianGrid horizontal={false} />
            <YAxis dataKey='categoryType' type='category' tickLine={false} tickMargin={10} axisLine={false} hide />
            <XAxis dataKey='count' type='number' hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
            <Bar dataKey='count' layout='vertical' radius={4}>
              <LabelList dataKey='categoryType' position='insideLeft' offset={8} className='fill-[--color-label]' fontSize={12} />
              <LabelList dataKey='count' position='right' offset={8} className='fill-foreground' fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='leading-none text-muted-foreground'>Showing the distribution of categories</div>
      </CardFooter>
    </Card>
  )
}
