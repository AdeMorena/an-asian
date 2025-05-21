import React from 'react';
import '../styles/style2.css';

function Team() {
  const teamMembers = [
    { name: 'Ivan Petrenko', role: 'Head Chef', photo: '/images/шеф1.png' },
    { name: 'Olena Koval', role: 'Chef', photo: '/images/шеф1.png' },
    { name: 'Serhiy Ivanov', role: 'Chef', photo: '/images/шеф1.png' },
  ];

  return (
    <section className="team">
      <h2>Our team</h2>
      <div className="team-cards">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.photo} alt={member.name} className="chef-photo" />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;