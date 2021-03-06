import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../Services/auth-api-service';
import Button from '../Button/Button';
import Banner from '../Banner/Banner';
import './Signup.css';
import TokenService from '../../Services/token-service';

class Signup extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  };

  state = { error: null };
  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault()
    const { username, password, password2 } = ev.target;
    let user = username.value;
    let pass = password.value;
    let pass2 = password2.value;

    if (pass !== pass2) {
      this.setState({
        error: 'Passwords must match'
      })
    }
    else {
      AuthApiService.postUser({
        username: user,
        password: pass,
      })
        .then(() => {
          username.value = ''
          password.value = ''
          AuthApiService.postLogin({
            username: user,
            password: pass
          })
            .then((res) => {
              TokenService.saveAuthToken(res.authToken);
              this.props.history.push('/dashboard');
            })
            .catch(() => this.props.history.push('/login'))
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }


  };

  componentDidMount() {
    document.title = 'Sign Up Page'
    this.firstInput.current.focus()
  };

  render() {
    let errorMessage = this.state.error ? <p className='signup-errorMessage' aria-live='polite'>{this.state.error}</p> : null;
    return (
      <section className='signup'>
        <Banner />
        <h1 className='signup-h1'>Sign up</h1>

        <form className='signupform' onSubmit={this.handleSubmit}>
          <div className='signup-input-box'>
            <Label htmlFor='signup-username-input'>Choose a username<Required /></Label>
            <Input
              className='signup-login-input'
              ref={this.firstInput}
              id='signup-username-input'
              name='username'
              required
              aria-required
            />
          </div>

          <div className='signup-input-box'>
            <Label htmlFor='signup-password-input'>Choose a password<Required /></Label>
            <Input
              className='signup-login-input'
              id='signup-password-input'
              name='password'
              type='password'
              required
              aria-required
            />
          </div>

          <div className='signup-input-box'>
            <Label htmlFor='signup-password2-input'>Retype password<Required /></Label>
            <Input
              className='signup-login-input'
              id='signup-password2-input'
              name='password2'
              type='password'
              required
              aria-required
            />
          </div>
          {errorMessage}

          <div className='signupbtn'>
            <Button type='submit'>Sign up</Button>
          </div>

          <div className='btnLink'>
            <Link to='/login'>Already have an account?</Link>
          </div>
        </form>
      </section>
    );
  };
};

export default withRouter(Signup);


