import React from "react";
import { Input, Button } from "@wedgekit/core";
import Form, { Field } from "@wedgekit/form";

export default class CharacterForm extends React.Component {
    handleSubmit = async values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);

        localStorage.setItem('values', JSON.stringify(values));
        window.alert(localStorage.getItem('values'));
    }
    
    render() {
        return (
            <Form onSubmit={ this.handleSubmit }>
              {({ formProps, dirty, submitting }) => (
                  <form { ...formProps }>
                      <Field
                        name="name"
                        label="Name"
                        defaultValue={JSON.parse(localStorage.getItem('values')).name}
                      >
                          {({ fieldProps }) => <Input { ...fieldProps } />}
                      </Field>
                      <Button domain="primary" type="submit" disabled={ !dirty || submitting }>
                          Create
                      </Button>
                  </form>
              )}
            </Form>
        );
    }
}
