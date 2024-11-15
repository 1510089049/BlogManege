<template>
  <div class="user-view-container">
    <div class="controls">
      <el-input v-model="searchQuery" placeholder="请输入用户名"></el-input>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button type="primary" @click="openDialog('add')">新增用户</el-button>
      <el-button type="danger" @click="handleBatchDelete" :disabled="!multipleSelection.length">批量删除</el-button>
    </div>
    <el-table :data="pagedData" style="width: 100%" class="animated-table" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" width="140"></el-table-column>
      <el-table-column prop="name" label="昵称" width="120"></el-table-column>
      <el-table-column prop="like" label="喜欢" width="120"></el-table-column>
      <el-table-column prop="password" label="密码" width="140"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="mini">修改</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total" class="pagination"></el-pagination>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="currentUser">
        <el-form-item label="ID">
          <el-input v-model="currentUser.id" :disabled="isEditMode"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="currentUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="currentUser.password"></el-input>
        </el-form-item>
        <el-form-item label="喜欢">
          <el-input v-model="currentUser.like"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="isEditMode ? handleUpdateUser() : handleAddUser()">{{ isEditMode ? '修改' : '确定'
          }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetUserList, DeleteUser, register, Modify, GetUserSearch } from '@/api/SvtccUser';

export default {
  name: 'userView',
  data() {
    return {
      searchQuery: '',
      allData: [],
      pagedData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      dialogTitle: '',
      isEditMode: false,
      currentUser: {
        id: '',
        username: '',
        password: '',
        like: ''
      },
      newUser: {
        id: '',
        username: '',
        password: '',
        like: ''
      },
      multipleSelection: []
    };
  },
  mounted() {
    this.fetchUserList();
  },
  methods: {
    fetchUserList() {
      GetUserList()
        .then(response => {
          this.allData = response.data;
          this.total = this.allData.length;
          this.updatePagedData();
        })
        .catch(error => {
          console.error("获取用户列表出错:", error);
        });
    },
    updatePagedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedData = this.allData.slice(start, end);
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.updatePagedData();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.updatePagedData();
    },
    handleDelete(id) {
      DeleteUser(id)
        .then(response => {
          if (response.data.code === 2020) {
            this.$message.success("用户删除成功");
            this.fetchUserList();
          } else {
            this.$message.error("删除用户失败");
          }
        })
        .catch(error => {
          this.$message.error("删除用户出错");
          console.error("删除用户出错:", error);
        });
    },
    openDialog(mode, user = null) {
      this.isEditMode = mode === 'edit';
      this.dialogTitle = this.isEditMode ? '修改用户' : '新增用户';
      this.dialogVisible = true;
      if (this.isEditMode) {
        this.currentUser = { ...user };
      } else {
        this.currentUser = { ...this.newUser };
      }
    },
    handleAddUser() {
      register(this.currentUser)
        .then(response => {
          if (response.code === 2010) {
            this.$message.success("用户新增成功");
            this.dialogVisible = false;
            this.fetchUserList();
            this.resetNewUser();
          } else {
            this.$message.error("新增用户失败");
          }
        })
        .catch(error => {
          this.$message.error("新增用户出错");
          console.error("新增用户出错:", error);
        });
    },
    handleEdit(user) {
      this.openDialog('edit', user);
    },
    handleUpdateUser() {
      Modify(this.currentUser)
        .then(response => {
          if (response.code === 2031) {
            this.$message.success("用户修改成功");
            this.dialogVisible = false;
            this.fetchUserList();
            this.resetNewUser();
          } else {
            this.$message.error("修改用户失败");
          }
        })
        .catch(error => {
          this.$message.error("修改用户出错");
          console.error("修改用户出错:", error);
        });
    },
    resetNewUser() {
      this.currentUser = {
        id: '',
        username: '',
        password: '',
        like: ''
      };
    },
    handleSearch() {
      GetUserSearch(this.searchQuery)
        .then(response => {
          if (response.code === 2030) {
            this.allData = response.data;
            this.total = this.allData.length;
            this.updatePagedData();
          } else {
            this.$message.error("查询用户失败");
          }
        })
        .catch(error => {
          this.$message.error("查询用户出错");
          console.error("查询用户出错:", error);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleBatchDelete() {
      const deletePromises = this.multipleSelection.map(item => {
        return DeleteUser(item.id);
      });

      Promise.all(deletePromises)
        .then(results => {
          const successCount = results.filter(response => response.data.code === 2020).length;
          this.$message.success(`成功删除了 ${successCount} 个用户`);
          this.fetchUserList();
        })
        .catch(error => {
          this.$message.error("批量删除出错");
          console.error("批量删除出错:", error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-view-container {
  padding: 20px;
}

.animated-table {
  transition: all 0.3s ease-in-out;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
