// 第一步，导入必要的模块
const fs = require('fs');
const archiver = require('archiver');
const proList = process.cwd().split("\\")
const name = proList[proList.length - 1] + '.zip'
// 第二步，创建可写流来写入数据
const output = fs.createWriteStream(process.cwd() + "/" + name);// 将压缩包保存到根目录下，并且压缩包名为xxx.zip
const archive = archiver('zip', { zlib: { level: 9 } });// 设置压缩等级

// 第三步，建立管道连接
archive.pipe(output);

// 第四步，压缩文件和目录到压缩包中
archive.directory('dist/', false)

// 第五步，完成压缩
archive.finalize();