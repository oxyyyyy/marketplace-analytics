import { Header } from "./components/layout/Header";
import { Container } from "./components/layout/Container";
import { MetricsCards } from "./components/cards/MetricsCards";
import { ViewsChart } from "./components/charts/ViewsChart";
import { RevenueChart } from "./components/charts/RevenueChart";
import { EventsTable } from "./components/events/EventsTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <Container>
        {/* Metrics Cards */}
        <MetricsCards />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ViewsChart />
          <RevenueChart />
        </div>

        {/* Events Stream */}
        <EventsTable />
      </Container>
    </div>
  );
}

export default App;
