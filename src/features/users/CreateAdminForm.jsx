import styled from "styled-components"

import InputContainer from "../../ui/InputContainer"
import Input from '../../ui/Input'
import Button from "../../ui/Button"
import FileInput from "../../ui/FileInput"

const StyledForm = styled.form`
    display: flex;
    flex-direction: column; 
    gap: 1rem;
    width: 70%;
`

function CreateAdminForm() {

    return <StyledForm>
        <InputContainer>
            <span>First name</span>
            <Input type="text" placeholder="First name"/>
        </InputContainer>
        <InputContainer>
            <span>Last name</span>
            <Input type="text" placeholder="Last name"/>
        </InputContainer>
        <InputContainer>
            <span>Email</span>
            <Input type="email" placeholder="admin@email.com"/>
        </InputContainer>
        <InputContainer>
            <span>Password</span>
            <Input type="password" placeholder="Password"/>
        <InputContainer>
        </InputContainer>
            <span>Confirm password</span>
            <Input type="password" placeholder="Confrim password"/>
        </InputContainer>
        <InputContainer>
            <span>Display picture</span>
            <FileInput/>
        </InputContainer>
        <Button>Create new admin</Button>
    </StyledForm>
}

export default CreateAdminForm;