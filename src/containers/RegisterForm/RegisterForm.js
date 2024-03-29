import React, { Component } from 'react'
import Input from '../Input/Input';

export default class RegisterForm extends Component {
   state = {
      formData: {
         name: {
            value: "",
            validator: {
               minLength: 3,
               maxLength: 6,
               required: true
            },
            error: { status: true, message: "", isTouched: false }
         },

         phonenumber: {
            value: "",
            validator: {
               minLength: 10,
               maxLength: 10,
            },
            error: { status: true, message: "", isTouched: false }
         },
         email: {
            value: "",
            validator: {
               required: true
            },
            error: { status: true, message: "", isTouched: false }
         },
         password: {
            value: "",
            validator: {
               minLength: 6,
               maxLength: 24,
               required: true
            },
            error: { status: true, message: "", isTouched: false }
         },

      },
      isFormValid: false
   };

   checkValue = (value, rules) => {
      let isValid = true;
      let trimmedValue = value.trim();
      let message = "";

      if (rules.require && trimmedValue.length === 0) {
         isValid = false;
         message = "คุณต้องกรอกที่นี่";
      }

      if (rules.maxLength && trimmedValue.length > rules.maxLength) {
         isValid = false;
         message = `ช่องนี้ความยาวต้องไม่เกิน ${rules.maxLength} ตัว`;
      }

      if (rules.minLength && trimmedValue.length < rules.minLength) {
         isValid = false;
         message = `ช่องนี้ความยาวต้องไม่เกิน ${rules.minLength} ตัว`;
      }

      return { isValid, message };
   };

   onChangeInput = (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      const formUpdate = { ...this.state.formData };
      formUpdate[fieldName].value = fieldValue;
      formUpdate[fieldName].error.isTouched = true;

      let { isValid, message } = this.checkValue(e.target.value, formUpdate[fieldName].validator);

      formUpdate[fieldName].error.status = !isValid;
      formUpdate[fieldName].error.message = message;

      let newIsFormValid = true;
      for (let key in formUpdate) {
         if (formUpdate[key].validator.required) {
            newIsFormValid = !formUpdate[key].error.status && newIsFormValid;
         }
      }

      this.setState({
         fromData: formUpdate,
         isFormValid: newIsFormValid
      });
   };
   onSubmit = (e) => {
      e.preventDefault();
      const { name, phonenumber, email, password } = this.state.formData;
      const result = {
         name: name.value,
         phonenumber: phonenumber.value,
         email: email.value,
         password: password.value,
      }
      console.log(result);
   }

   render() {
      const { name, phonenumber, email, password } = this.state.formData;

      return (
         <div className="RegisterForm">
            <form onSubmit={this.onSubmit}>
               <Input onChangeInput={this.onChangeInput} value={name.value} name="name" placeholder="ชื่อ" error={name.error} />
               <Input onChangeInput={this.onChangeInput} value={phonenumber.value} name="phonenumber" placeholder="เบอร์โทรศัพย์" error={phonenumber.error} />
               <Input onChangeInput={this.onChangeInput} value={email.value} name="email" placeholder="อีเมล์" error={email.error} />
               <Input onChangeInput={this.onChangeInput} value={password.value} name="password" placeholder="รหัสผ่าน" error={password.error} />
               
               <button disabled={!this.state.isFormValid} htmlFor="submit" className="Button">Register</button>
            </form>
         </div>
      );
   }
}
