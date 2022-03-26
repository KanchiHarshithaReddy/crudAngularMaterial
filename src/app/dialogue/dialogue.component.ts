import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
freshnessList=["one Week","fifteen Days","oneMonth"]
productForm !: FormGroup
actionBtn:string="save";
  constructor(private formBuilder:FormBuilder,private api:ApiService ,@Inject(MAT_DIALOG_DATA) public editData:any,
     private dialogRef:MatDialogRef<DialogueComponent>) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
    productName:['',Validators.required],
    category:['',Validators.required],
    date:['',Validators.required],
    fresh:[''],
    price:['',Validators.required],
    comment:['',Validators.required]
    
    });
    // console.log(this.editData);
    if(this.editData){
      this.actionBtn="Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.data);
      this.productForm.controls['fresh'].setValue(this.editData.fresh);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }
addProducts(){
 if(!this.editData){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(_res)=>{
        alert("product added successfully");
        this.productForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        alert("Error while adding the product");
      }
    })
  }
 }else{
   this.updateProduct()
 }
}
updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("product updated successfully");
      this.productForm.reset();
      this.dialogRef.close('update');
      
    },
  error:()=>{
    alert("Error while getting the record");
  }
})
}
}
