<template>
    <div>
         <b-container fluid>
            <b-row>
                <b-col sm="8" class="border-bottom border-primary mw-100">
                    <p class="mw-95"> {{currentNotes.title}}</p>
                </b-col>
                <b-col sm="2" class="border-bottom border-primary mw-100">
                    <b-button variant="success" @click="editModel(currentNotes)" >Edit</b-button>
                </b-col>
                <b-col sm="2" class="border-bottom border-primary">
                    <b-button variant="danger" @click="deleteNotes(currentNotes._id)">delete</b-button>
                </b-col>
            </b-row>
        </b-container>
         <b-modal ref="editNote" title="Edit Note" @ok="updateNotes()">
    	<b-container>
            <b-row align-v="center">
                <b-col sm="12" class="m-3">
                <b-form-input
                    id="input-1"
                    type="text"
                    required
                    placeholder="Enter Title"
                    v-model="noteTitle"
                    ></b-form-input>
                </b-col>
            </b-row>
            
            <b-row align-v="center">
                <b-col sm="12" class="m-3">
                <b-form-input
                    v-model="noteContent"
                    type="text"
                    required
                    placeholder="Enter Content"
                    ></b-form-input>
                </b-col>
            </b-row>
        </b-container>
  </b-modal>
    </div>
</template>
<script>
export default {
   props:{
       currentNotes:Object,
       
   },
   data() {
       return {
       noteContent:String,
       noteTitle:String,
       noteId:String    
       }
   },methods: {
       deleteNotes(noteId){
           console.log(noteId);
           fetch('http://localhost:3000/notes/'+noteId,{
                    method:"delete",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                   
                }).then(response=>{
                    return (response.json()) 
                }).then(responseJSON=>{
                    
                    alert(responseJSON.message);
                    this.$emit('deleteNotes');
                    
                })
       },
       editModel(Note){
           console.log("Edit Notes")
           this.noteTitle=Note.title
           this.noteContent=Note.content
           this.noteId=Note._id
           this.$refs['editNote'].show()
       },
       updateNotes(){
           console.log('Update Notes')
           if(this.noteTitle==""||this.noteContent==""){
			alert("Title and Content are Complusary");
		}else {
			fetch('http://localhost:3000/notes/'+this.noteId,{
                    method:"PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
					},
					body:JSON.stringify({
						title:this.noteTitle,
						content:this.noteContent
					})
                   
                }).then(response=>{
                    return (response.json()) 
                }).then(responseJSON=>{
					console.log(responseJSON)
					 this.$emit('editNotes')
                })
		}
       }
   },
}
</script>
