<template>
  <div class="book-view-container">
    <h1>书籍管理界面</h1>

    <!-- 添加图书表单 -->
    <div class="add-book-form">
      <el-form :model="newBook" label-width="80px">
        <el-form-item label="书名">
          <el-input v-model="newBook.bookName"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="newBook.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="newBook.store" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddBook">添加图书</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-input v-model="searchQuery" placeholder="请输入书名"></el-input>
    <el-button type="primary" @click="handleSearch">查询</el-button>
    <el-table :data="bookList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="bookName" label="书名" width="180"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="store" label="库存" width="100"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改图书的弹窗 -->
    <el-dialog :visible.sync="editDialogVisible" title="修改图书">
      <el-form :model="editBook" label-width="80px">
        <el-form-item label="书名">
          <el-input v-model="editBook.bookName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editBook.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="editBook.store" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdateBook">保存</el-button>
          <el-button @click="editDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GetBookList, SaveBook, DelBook, updateBook } from '@/api/SvtccMusic';

export default {
  name: 'BookView',
  data() {
    return {
      searchQuery: '',
      bookList: [],
      newBook: {
        bookName: '',
        price: '',
        store: ''
      },
      editDialogVisible: false,
      editBook: {
        id: '',
        bookName: '',
        price: '',
        store: ''
      }
    };
  },
  methods: {
    fetchBookList(query) {
      const data = {
        id: '', // 根据需要填入
        bookName: query || '',
        price: '', // 根据需要填入
        store: '' // 根据需要填入
      };

      GetBookList(data)
        .then(response => {
          if (response.code === 2000) {
            this.bookList = response.data;
          } else {
            this.$message.error("查询书籍失败");
          }
        })
        .catch(error => {
          this.$message.error("查询书籍出错");
          console.error("查询书籍出错:", error);
        });
    },
    handleSearch() {
      this.fetchBookList(this.searchQuery);
    },
    handleAddBook() {
      SaveBook(this.newBook)
        .then(response => {
          if (response.code === 2000) {
            this.$message.success("添加成功");
            this.newBook = { bookName: '', price: '', store: '' }; // 清空表单
            this.fetchBookList(); // 刷新书籍列表
          } else {
            this.$message.error("添加失败");
          }
        })
        .catch(error => {
          this.$message.error("添加图书出错");
          console.error("添加图书出错:", error);
        });
    },
    openEditDialog(book) {
      this.editBook = { ...book }; // 克隆一份选中的书籍数据
      this.editDialogVisible = true;
    },
    handleUpdateBook() {
      updateBook(this.editBook)
        .then(response => {
          if (response.code === 2000) {
            this.$message.success("修改成功");
            this.editDialogVisible = false; // 关闭弹窗
            this.fetchBookList(); // 刷新书籍列表
          } else {
            this.$message.error("修改失败");
          }
        })
        .catch(error => {
          this.$message.error("修改图书出错");
          console.error("修改图书出错:", error);
        });
    },
    handleDelete(book) {
      DelBook(book)
        .then(response => {
          if (response.code === 2020) {
            this.$message.success("删除成功");
            this.fetchBookList(); // 刷新书籍列表
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(error => {
          this.$message.error("删除图书出错");
          console.error("删除图书出错:", error);
        });
    }
  },
  mounted() {
    this.fetchBookList();
  }
};
</script>

<style lang="scss" scoped>
.book-view-container {
  padding: 20px;
}

.add-book-form {
  margin-bottom: 20px;
}
</style>
