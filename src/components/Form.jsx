const Form = ( { handleSubmit, handleChange, inputs }) => {
  return (
    <form onSubmit={handleSubmit} 
      className="flex flex-col border-solid border-slate-400 border-1 p-4 gap-4 rounded-sm w-1/2 ">
      <input type="text" name="title" placeholder="Title" value={inputs.title} 
        onChange={handleChange} className="border-slate-400 border-solid border-1 px-2 py-1 rounded-sm"/>
      <textarea name="description" id="description" cols="30" rows="10" placeholder="Description (optional)"
        value={inputs.description} onChange={handleChange} 
        className="border-slate-400 border-solid border-1 px-2 py-1 rounded-sm">
      </textarea>
      <button type="submit"
        className="border-slate-400 border-solid border-1 px-2 py-1 bg-slate-950 text-blue-300 
        transition-all duration-200 hover:underline rounded-sm">
        Post
      </button>
    </form>
  );
};

export default Form;