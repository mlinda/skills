const fs = require('fs'); // 引入fs模块
const path = require('path');

// const basePath = process.env.outputDir;  // 输出根路径
let basePath = 'dist';
let manifestName = 'cache.manifest';  // 缓存文件名称
let currentFilename = __filename.slice(__dirname.length+1);  // 当前文件名称

// 确定根路径
fs.exists('./dist', (exist)=>{
  if(!exist){
    basePath = 'prd';
  }
});
// 获取根路径下文件夹
let distFilenames = fs.readdirSync(path.resolve(`${__dirname}/../`,`./${basePath}`));
let distFilePathnames = []; // 文件
let distFoldernames = [];   // 文件夹
for(let i = 0 ; i < distFilenames.length ; i ++){
  let item = distFilenames[i];
  if(fs.statSync(`${__dirname}/../${basePath}/${item}`).isDirectory()){
    distFoldernames.push(item);
  }else {
    if(item.indexOf(manifestName) === -1 && item.indexOf(currentFilename) === -1 && item.indexOf('index.html') === -1){
      distFilePathnames.push(`./${item}`);
    }
  }
}
// 获取文件夹的文件
const typeFilenames = (type)=>{
  let filenames = fs.readdirSync(path.resolve(`${__dirname}/../`,`./${basePath}/${type}`));
  let filePathnames = [];
  for(let i = 0 ; i < filenames.length ; i ++){
    let item = filenames[i];
    if(fs.statSync(`${__dirname}/../${basePath}/${type}/${item}`).isDirectory()){
      filePathnames = filePathnames.concat(typeFilenames(`${type}/${item}`));
    }else {
      filePathnames.push(`./${type}/${item}`);
    }
  }
  return filePathnames;
};
// 所有需要缓存的文件
for(let j = 0 ; j < distFoldernames.length ; j ++){
  distFilePathnames = distFilePathnames.concat(typeFilenames(distFoldernames[j]));
}
// 缓存清单  折行显示
let filename = '';
for (let i = 0; i < distFilePathnames.length; i++) {
  filename += distFilePathnames[i] + '\n';
}
let fileCon =
  'CACHE MANIFEST' + '\n'
  + '# Time: ' + new Date() +'\n'
  + '\n'
  + 'CACHE:' + '\n'
  + filename +  '\n'
  + '\n'
  + 'NETWORK:' + '\n'
  + '*' + '\n'
  + '\n'
  + 'FALLBACK:' + '\n'
  + './html/empty.html' + '\n';

// 写入文件内容（如果文件不存在会创建一个文件）
fs.writeFile(`./${basePath}/${manifestName}`, fileCon, function (err) {
  if (err) {
    throw err;
  }

  // 写入成功后读取测试
  // fs.readFile('./dist/cache2.manifest', 'utf-8', function (err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(data);
  // });

  // 读取index.html  添加manifest属性
  let result = '';
  fs.readFile(`./${basePath}/index.html`, 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }
    if(data.indexOf(manifestName)>-1){
      result = data;
    }else {
      result = data.replace('<html','<html manifest="'+manifestName+'"')
    }
    /*result =  data.replace(/<html[^>]*manifest="([^"]*)"[^>]*>/,function(word){
      console.log('111');
      console.log(word);
      return word.replace(/manifest="([^"]*)"/,'manifest="'+manifestName+'"');
    }).replace(/<html(\s?[^\\>]*\\>)/,function(word){
      if(word.indexOf('manifest')>-1) return word
      return word.replace('<html','<html manifest="'+manifestName+'"')
    });*/
    fs.unlink(`./${basePath}/index.html`,function(){
      fs.writeFile(`./${basePath}/index.html`, result, function (err) {
        if(err){
          console.log(err);
        }
      });
    });
  });
});

// manifest除了缓存manifest.appcache文件所指定的资源外，还必定会缓存当前的html页面。
