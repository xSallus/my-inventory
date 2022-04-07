import { useState, ChangeEvent, FormEvent } from "react"
import { ModalBase, Overlay, Form } from "./base"

import { api } from "../../services/api"

interface IModalProps {
  isOpen: boolean;
	toggle: ()=>void;
}

const initialValue = {
  name:"", category:"", expiration:"", quantity:0
}

function ResisterProductModal({ toggle, isOpen }: IModalProps) {
  const [product, setProduct] = useState(initialValue)

	function cleanUp() {
		setProduct(initialValue)		
		setTimeout(toggle, 1500)
	}

	async function submit(e: FormEvent) {
	  e.preventDefault()

		const { data } = await api.post("/posts", product)

		if(!Object.entries(data).length) {
		  alert("Registry failed ;C")
		}

		e.currentTarget.reset()
		cleanUp(e)
	}

	function handleChange(e: ChangeEvent) {
	  const temp = {
		  ...product,
	    [e.currentTarget.name]: e.currentTarget.value
		}

		setProduct(temp)
	}

  return (
	  <Overlay isOpen={isOpen}>
	    <ModalBase className="form">
			  <Form onSubmit={submit}>
				 <fieldset>
				  <legend>Product name</legend>
	  		  <input
					 placeholder="Salame"
	  			 required
	  		   type="text"
   				 name="name"
  			   maxLength="30"
	  			 onChange={handleChange}
  			  />
		 		 </fieldset>
				 <fieldset>
				  <legend>Expiration</legend>
				  <input
				    required
				    type="date"
			  	  name="expiration"
			  	  placeholder="2021-05-23"
					  max="3000-12-31"
				 	  onChange={handleChange}
				  />
				 </fieldset>
				 <fieldset>
				  <legend>Quantity</legend>
			  	<input
			  	 required
			  	 type="number"
			  	 name="quantity"
		  		 placeholder="999"
		  		 min="1"
		  		 max="999"
		  		 onChange={handleChange}
				  />
				 </fieldset>
				 <fieldset>
				  <legend>Category</legend>
	 		 	  <select name="category" onChange={handleChange} >
	  	 		   <option disabled selected value=""></option>
		  		   <option value="food">Food</option>
	  				 <option value="hygiene">Hygiene</option>
		  			 <option value="cleaning">Cleaning</option>
		  			 <option disabled value="office">Office</option>
				  </select>
				 </fieldset>
				 <button type="button" onClick={cleanUp}>CANCEL</button>
				 <button type="submit">SUBMIT</button>
				</Form>
			</ModalBase>
		</Overlay>
	)
}

export { ResisterProductModal }