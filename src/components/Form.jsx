const Form = ( { handleSubmit, handleChange, inputs }) => {
  return (
    <form onSubmit={handleSubmit} 
      className="flex flex-col border-solid border-black border-2 p-4">
      <input type="text" name="title" placeholder="Title" value={inputs.title} 
        onChange={handleChange} className="border-black border-solid border-2"/>
      <textarea name="description" id="description" cols="30" rows="10" 
        value={inputs.description} onChange={handleChange} 
        className="border-black border-solid border-2">
      </textarea>
      <button type="submit">Post</button>
    </form>
  );
};

export default Form;