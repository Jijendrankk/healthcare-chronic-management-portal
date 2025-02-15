import withAuth from "../../hoc/withAuth";

function Dashboard() {
  return <h1>Redirecting to your dashboard...</h1>;
}

export default withAuth(Dashboard);