angular.module('starter.controllers', [])

.controller('tabCtrl', function($scope) {


})
.controller('indexCtrl', function($scope,$window,$timeout,$interval,$http,$sce) {
  $scope.data=[]; //列表数据
  

  $scope.audio={
  	url:$sce.trustAsResourceUrl("http://dl.loveq.cn/live/program/mp3/2003.0706.mp3"), //播放链接地址
    url_next:"",  //上一首链接地址
    url_pre:"",   //下一首链接地址
  	title:"这里是标题",
    currentTime:0,  //音频当前时间
    duration:0, //音频总时间
    status:1, //播放状态 1:等待播放 2:播放中 3:暂停
    value:0,  //当前播放进度 最大值10000
    interval:null,
    element:document.getElementById("audio")
  };
  //获取播放进度
  $scope.get_duration=function(){
    $scope.audio.interval=$interval(function(){
      if($scope.audio.duration==0)$scope.audio.status=1; 
      else if($scope.audio.duration!=0&&$scope.audio.status==1)$scope.audio.status=2;
      $scope.audio.currentTime=$scope.audio.element.currentTime;
      $scope.audio.duration=$scope.audio.element.duration;
      //计算当前进度
      $scope.audio.value=$scope.audio.currentTime/$scope.audio.duration*10000;
    },100);
  }
  //组装时间
  $scope.get_time=function(num){
    var _num=parseInt(num),
        hour=Math.floor(_num/3600),
        min=Math.floor((_num-hour*3600)/60),
        sec=_num-hour*3600-min*60;
    var date=hour<10?"0"+hour:hour;
        date+=":";
        date+=min<10?"0"+min:min;
        date+=":";
        date+=sec<10?"0"+sec:sec;
    return date;

  }
  $scope.progress_change=function(){
    $scope.audio.currentTime=$scope.audio.value/10000*$scope.audio.duration;
    $scope.audio.element.currentTime=$scope.audio.currentTime;
  }
  $scope.play=function(){
    $scope.audio.status=3;
    $scope.audio.element.play();
  }
  $scope.pause=function(){
    $scope.audio.status=2;
    $scope.audio.element.pause();
  }
  $scope.get_duration();


  
});