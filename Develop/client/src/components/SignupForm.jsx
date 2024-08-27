import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      if (data && data.addUser && data.addUser.token) {
        Auth.login(data.addUser.token);
      } else {
        console.error('No token returned from addUser mutation.');
      }
    } catch (e) {
      console.error('Signup Error:', e);
      console.error('Error details:', JSON.stringify(e, null, 2));
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your username"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Your email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Your password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignupForm;



