import withAuth from "../../hoc/withAuth";

function PatientDashboard() {
  return (

    <div>
      <h2>Welcome, Patient</h2>
      <p>Manage your records here.</p>
    </div>
    
  );
}

export default withAuth(PatientDashboard, ["patient"]);
