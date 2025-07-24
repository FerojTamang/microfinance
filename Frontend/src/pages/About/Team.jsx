import React from "react";
import "./Team.css"; // 👈 you'll create this file

function Team() {
  const members = [
    {
      name: "Sita Sharma",
      position: "Chairperson",
      image:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Ram Bahadur",
      position: "Secretary",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Mina Thapa",
      position: "Finance Officer",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  return (
    <section className="team-section">
      <h2 className="team-heading">Our Team</h2>
      <div className="team-grid">
        {members.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-position">{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;
