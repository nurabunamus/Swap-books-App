import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BookStatus({ setShowGive, giveBook, status, setStatus }) {
  const { profile, id } = useSelector((state) => state.User);

  return (
    <Dialog disableEscapeKeyDown open={true} onClose={() => setShowGive(false)}>
      {profile ? (
        <>
          <div className="dialog-title">
            <DialogTitle>حدد حالة الكتاب</DialogTitle>
            <a href="#" className="book-status">
              دليل تحديد حالة الكتاب
            </a>
          </div>
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, minWidth: 450 }}>
                <InputLabel htmlFor="demo-dialog-native">حالة الكتاب</InputLabel>
                <Select
                  native
                  value={status}
                  onChange={(event) => {
                    setStatus(Number(event.target.value) || "");
                  }}
                  input={<OutlinedInput label="Age" id="demo-dialog-native" />}>
                  <option aria-label="None" value="" />
                  <option value={0}>كالجديد</option>
                  <option value={1}>ممتاز</option>
                  <option value={2}>جيد جدا</option>
                  <option value={3}>جيد</option>
                  <option value={4}>قابل للاستخدام</option>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                if (!status) {
                  alert("ادخل حالة الكتاب اولا");
                } else {
                  giveBook();
                }
              }}
              className="give-book-btn">
              أعط الكتاب
            </Button>
            <Button onClick={() => setShowGive(false)}>إلغاء</Button>
          </DialogActions>
        </>
      ) : id ? (
        <div className="dialog-title-sub2">
          <DialogTitle>يرجى اكمال ملفك الشخصي قبل البدء في اعطاء اي كتاب</DialogTitle>
          <Link to="/profile">قم بتعديل الملف الشخصي</Link>
        </div>
      ) : (
        <div className="dialog-title-sub2">
          <DialogTitle>يرجى تسجيل الدخول اولا الى حسابك!</DialogTitle>
          <Link to="/login">تسجيل الدخول الان</Link>
        </div>
      )}
    </Dialog>
  );
}

export default BookStatus;
