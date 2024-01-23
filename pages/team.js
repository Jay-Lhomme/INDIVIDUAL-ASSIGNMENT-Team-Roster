/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/MemberData';
import MemberCard from '../components/MemberCard';

function Member() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/team/new" passHref>
        <Button>Add a Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
        ))}
      </div>
    </div>
  );
}

export default Member;
