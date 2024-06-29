import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Breadcrumbs,
    Link,
    Typography,
    TableContainer,
} from "@mui/material";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './common.css';
import b1 from '../../image/bangGia/image.png';
import b2 from '../../image/bangGia/b2.png';
import b3 from '../../image/bangGia/b3.png';

export default function PricePage() {

    return (
        <>
            <Header />
            <Container
                sx={{ position: "relative", paddingTop: "20px", margin: "0px", backgroundColor: "#000000", maxWidth: "100% !important" }}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Breadcrumbs
                        aria-label="breadcrumb" sx={{ color: "#ffffff" }}
                    >
                        <Link
                            underline="hover"
                            sx={{ display: "flex", alignItems: "center" }}
                            color="#ffffff"
                            href="/"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            sx={{ display: "flex", alignItems: "center" }}
                            color="#ffffff"
                            href="/price-list"
                        >
                            price list
                        </Link>
                    </Breadcrumbs>
                </div>
                <Box className="main-content-cart">
                    <Typography variant="h3" className="custom_blog_title" style={{ textAlign: 'center' }}>
                        BẢNG GIA KIM CƯƠNG MỚI NHẤT HÔM NAY
                    </Typography>
                    <Box className="shoppingcart-content" sx={{ marginX: '0px' }}>
                        <TableContainer>
                            <Typography variant="body1" gutterBottom className="content">
                                Bảng giá hột xoàn tham khảo theo ly (mm), nước màu (color) & độ sạch. Nếu quý khách đang muốn mua trang sức nhẫn, dây chuyền, hoa tai… bằng kim cương nhưng chưa biết giá kim cương mua vào bán ra hiện nay như thế nào, hãy tham khảo nhanh báo giá mới nhất mới cập nhật ngay dưới đây.                            </Typography>

                            <Typography className="content" variant="body2" gutterBottom sx={{ fontStyle: 'italic', marginLeft: '20px', marginRight: '20px', textAlign: 'center' }}>
                                (Đơn vị tiền tệ: VNĐ)
                            </Typography>

                            <Typography className="content" variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                                Giá kim cương siêu rẻ <span style={{ color: '#d9be6f' }}>3ly6</span>
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src={b1} style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />

                            <Typography className="content" variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                                Giá kim cương  <span style={{ color: '#d9be6f' }}>3ly9</span>
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src={b1} style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />

                            <Typography className="content" variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                                Bảng Giá Kim cương tự nhiên <span style={{ color: '#d9be6f' }}>4ly1</span>
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <img src={b1} style={{ maxWidth: '100%', height: 'auto' }} />
                            </Box>
                            <br />


                            <Typography className="content" variant="body1" gutterBottom>
                                Kim cương rời ❤️ hay hột xoàn thiên nhiên ❤️ có giấy kiểm định quốc tế hôm nay có giá giao động từ 5 triệu ✓ cho đến hàng trăm triệu, ✓ riêng những viên kim cương kích thước lớn đến siêu to có giá lên đến hàng tỷ đồng. Theo chia sẻ một số chuyên gia nghiên cứu thị trường nhận định: Chúng phụ thuộc chủ yếu dựa trên tiêu chuẩn 4C, và còn có một số tiêu chuẩn khác như độ cân xứng, độ phát quang, độ sạch, giấy chứng nhận…
                            </Typography>



                        </TableContainer>
                    </Box>
                </Box>
            </Container >
            <Footer />
        </>
    );
}
