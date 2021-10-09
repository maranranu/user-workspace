const fs = require('fs-extra');
const path = require('path');
const Promise = require('bluebird');
const { efs: config } = require('config');

class Workspace {
  _absolutePath (userId, pwdPath) {
    userId = userId.toString();
    const nfsPath = path.resolve(config.homePath, userId);
    return path.resolve(nfsPath, pwdPath);
  }

  async _nameUniqueness (data, file, type) {
    try {
      const files = await this.findAll(data);
      const filterFiles = files.filter((f) => {
      if ((type === 'folder' && file === f.name) || (type === 'file' && file === f.name)) {
        return f;
      }
    });
    if (filterFiles.length) {
      throw new Error(`${file} is already present in the destination`, type);
    } else {
      return Promise.resolve();
    }
  } catch (error) {
    if (error.status === 404 || error.statusCode === 404) {
      return Promise.resolve();
    } else {
      throw error;
    }
  }
}

  async findAll (filters) {
    try {
      let absolutePath = this._absolutePath(filters.userId, filters.pwdPath);
      let pwdPath = filters.pwdPath;

      let files = await fs.readdir(absolutePath);
      let result = [];
      await Promise.map(files, async(file) => {
        let fileName = basename(file);
        const stats = await fse.stat(path.resolve(absolutePath, file));
        let pwdFilePath = pwdPath ? `${pwdPath}/${fileName}` : fileName;
        result.push({
          name: fileName,
          pwdPath: pwdFilePath,
          userId: filters.userId,
          type: stats.isFile() ? 'file' : 'folder'
        })
      })
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create (data) {
    let absolutePath = this._absolutePath(data.userId, data.pwdPath);
    absolutePath = path.resolve(absolutePath, data.name);
    await this._nameUniqueness(data, data.name, data.type);

    if (data.type === 'folder') {
      return fs.ensureDir(absolutePath)
    } else {
      return fs.writeFile(absolutePath, content);
    }
  }

  async update (operationType, data) {
    let absolutePath = this._absolutePath(data.userId, data.pwdPath);
    if (operationType === 'rename') {
      let newPwdPath = data.pwdPath.split('/');
      newPwdPath.splice(newPwdPath.length - 1, 1);
      let pwdPath = newPwdPath.length ? newPwdPath.join('/') : '';
      await this._nameUniqueness({userId: data.userId, pwdPath: pwdPath}, data.name, data.type);
      newPwdPath = newPwdPath.length ? `${newPwdPath.join('/')}/${data.name}` : data.name;
      return fs.rename(this._absolutePath(data.userId, newPwdPath));
    } else if (operation === 'code_update') {
      return fs.writeFile(absolutePath, data.content);
    } else {
      return Promise.reject(new Error('Unknown operation type for update'))
    }
  }

  destroy (data) {
    let absolutePath = this._absolutePath(data.userId, data.pwdPath);
    return fs.remove(absolutePath);
  }
}

module.exports = Workspace;
