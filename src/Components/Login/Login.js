import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthApiService from '../../Services/auth-api-service';
import { Input, Required, Label } from '../Form/Form';
import Button from '../Button/Button';
import TokenService from '../../Services/token-service';
import Banner from '../Banner/Banner';
import './Login.css';

class Login extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  state = { error: null }

  resetError = () => {
    this.setState({
      error: null
    })
  }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault();
    const { username, password } = ev.target;

    let user = username.value.split(' ').join('');

    AuthApiService.postLogin({
      username: user,
      password: password.value,
    })
      .then(res => {
        username.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);

        this.props.history.push('/dashboard');
      })
      .catch(res => {
        this.setState({ error: res.error })
      });
  }

  componentDidMount() {
    document.title = 'Login Page'
    this.firstInput.current.focus()
  }

  render() {
    let errorMessage = this.state.error ? <p className='login-errorMessage'>{this.state.error}</p> : null;

    return (
      <div className='login'>
        <Banner />
        <h1 className='login-h1'>Login</h1>

        <form className='loginform' onSubmit={event => this.handleSubmit(event)} onChange={() => this.resetError()}>
          <div className='login-input-box'>
            <Label htmlFor='login-username-input'>Username<Required /></Label>
            <Input
              className='signup-login-input'
              ref={this.firstInput}
              id='login-username-input'
              name='username'
              required
              aria-required
            />
          </div>

          <div className='login-input-box'>
            <Label htmlFor='login-password-input'>Password<Required /></Label>
            <Input
              className='signup-login-input'
              id='login-password-input'
              name='password'
              type='password'
              required
              aria-required
            />
          </div>
          {errorMessage}
          <div className='loginbtn'>
            <Button type='submit'>Login</Button>
          </div>

          <div className='btnLink'>
            <Link to='/signup'>Need to create an account?</Link>
          </div>
        </form>
      </div>
    );
  };
};

export default withRouter(Login);


