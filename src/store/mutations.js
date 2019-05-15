var mutations={
  mediaList:(state,param)=>{
    state.mediaListUrl=param.amount.mediaListUrl;
    state.mediaListSlide=param.amount.mediaListSlide;
  }
};
export default mutations;
