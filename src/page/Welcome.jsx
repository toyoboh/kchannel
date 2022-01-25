import "../css/Welcome.css";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import PersonRoundedIcon      from "@material-ui/icons/PersonRounded";
import React                  from "react";
import { useHistory }         from "react-router-dom";

function Welcome() {
    const history = useHistory();

    const goToLogin = () => {
        history.push("/login");
    }

    const goToRegisterAccount = () => {
        history.push("/registerAccount");
    }
    return(
        <div className="welcome">
            {/* <p>Kちゃんねる welcome page</p>
            <p><UILink to="/login" underline="true">login</UILink></p> */}
            
            <header className="header">
                <div className="wrapper">
                    <div className="box">
                        <h1 className="app-name">K-Channel</h1>

                        <div className="app-description">
                            韓国掲示板です！好きなことをたくさん語りましょう！
                        </div>

                        <div className="button-container">
                            <button
                                className="button signin"
                                onClick={ goToLogin }
                            >
                                <DoubleArrowRoundedIcon />Sign in
                            </button>
                            
                            <button
                                className="button signup"
                                onClick={ goToRegisterAccount }
                            >
                                <PersonRoundedIcon />Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div className="wrapper">
                    
                </div>
            </main>

            <footer>
                <div className="wrapper">
                    
                </div>
            </footer>
        </div>
    )
}

export default Welcome;
