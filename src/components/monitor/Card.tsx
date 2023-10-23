const Card = (props:any) => {
    return (
      <div style={{backgroundColor:props.color}} className="relative h-40 w-64 rounded-md border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-transparent ">
          <img src={props.icon}/>
        </div>
        <div className="text-3xl text-white">
          {props.title}
        </div>
        </div>
        <div className="absolute bottom-0 right-0 m-6 text-xl text-white">
          {props.value}
        </div>
      </div>
    );
  };
  
  export default Card;
  