import { FloatingLabel, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createMember, updateMember } from '../api/MemberData';

const initialState = {
  name: '',
  image: '',
  uid: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push(`/member/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      {/* {NAME INPUT} */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Member Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Member Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* {ROLE INPUT} */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Member Role"
        className="mb-3"
      >
        <Form.Select
          type="text"
          placeholder="Enter a Role"
          name="role"
          onChange={handleChange}
          value={formInput.role}
          required
        >
          <option value="">Select a Role</option>
          <option value="ROCK">ROCK</option>,
          <option value="PAPER">PAPER</option>,
          <option value="SCISSOR">SCISSOR</option>
        </Form.Select>
      </FloatingLabel>

      {/* {IMAGE INPUT} */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Member Image"
        className="mb-3"
      >
        <Form.Control
          type="url"
          placeholder="Enter a Url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* {SUBMIT BUTTON} */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member </Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
