import React from "react";
import { Redirect } from "react-router-dom";
import { Input, Button } from "@wedgekit/core";
import Form, { Field } from "@wedgekit/form";

export default class CharacterForm extends React.Component {
    constructor(props) {
        super(props);
        
        const redirect = 
            (localStorage.getItem("values") && !props.location.state.edit) 
                ? true 
                : false;
        this.state = { redirect: redirect }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);

        localStorage.setItem("values", JSON.stringify(values));

        this.setState({
            redirect: true
        });
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to="/character_sheet"/>
        }

        return (
            <Form onSubmit={ this.handleSubmit }>
              {({ formProps, submitting }) => (
                  <form { ...formProps }>
                      <Field
                        name="name"
                        label="Name"
                        defaultValue={ localStorage.getItem("values")
                            ?  JSON.parse(localStorage.getItem("values")).name
                            : "" 
                        }
                      >
                          {({ fieldProps }) => <Input { ...fieldProps } />}
                      </Field>
                      <Button domain="primary" type="submit" disabled={ submitting }>
                          { localStorage.getItem("values") ? "Save" : "Create" }
                      </Button>
                  </form>
              )}
            </Form>
        );
    }
}
