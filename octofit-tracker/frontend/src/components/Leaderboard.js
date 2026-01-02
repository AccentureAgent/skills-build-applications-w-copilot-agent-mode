import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched leaderboard:', results);
        console.log('API endpoint:', apiUrl);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [apiUrl]);

  return (
    <div>
      <h2 className="mb-4 text-success">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              {leaders.length > 0 && Object.keys(leaders[0]).map((key) => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, idx) => (
              <tr key={leader.id || idx}>
                {Object.values(leader).map((val, i) => (
                  <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {leaders.length === 0 && <div className="alert alert-info">No leaderboard data found.</div>}
      </div>
    </div>
  );
};

export default Leaderboard;
