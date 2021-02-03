import { Button, Container } from '@chakra-ui/react';
import { AuthContext } from 'context/Auth';
import Router from 'next/router';
import { useContext, useEffect, VFC } from 'react';
import { auth, provider } from 'utils/firebase';

const SignIn: VFC = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    currentUser && Router.push('/');
  }, [currentUser]);

  const login = () => {
    auth.signInWithRedirect(provider);
  };

  return (
    <Container>
      <Button onClick={login}>Login with Google</Button>
    </Container>
  );
};

export default SignIn;
