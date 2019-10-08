<template>
  <div class="app-container NewProduct">
    <sticky
      :className="'sub-navbar published'"
      style="margin-bottom:12px"
    >
      <template>
        <el-button
          type="primary"
          @click="onSubmit"
          v-loading="submitloading"
          :disabled="submitloading"
        >保存</el-button>
      </template>
    </sticky>
    <el-form
      :model="productForm"
      ref="productForm"
      labelWidth="100px"
    >
      <item-title text="商品明细" />
      <el-card shadow="hover">
        <el-row>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="货主："
              prop="owner"
              :rules="[{required: true, message:'必填项'}]"
            >
              <el-select
                v-model="productForm.owner"
                size="small"
                :disabled="Boolean(this.$route.query.skuCode)"
                filterable
                clearable
                @change="ownerChange"
                placeholder="请选择货主"
                class="formitem"
              >
                <el-option
                  v-for="item in mapConfig['billOwnerInfoMap']"
                  :label="item.value"
                  :key="item.key"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="货主商品编码："
              labelWidth="110px"
              prop="ownerSkuCode"
              :rules="[{max:20, message:'最长20位', trigger: 'blur'}]"
            >
              <el-input
                v-model="productForm.ownerSkuCode"
                placeholder="请输入货主商品编码"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="商品分类："
              prop="categoryCode"
              :rules="[{ validator: categoryValidator, required: true, trigger: 'change' }]"
            >
              <div style="height:32px">
                <choice-category
                  @categorySubmit="categorySubmit"
                  ref="categoryChoice"
                ></choice-category>
                <el-input
                  type="hidden"
                  v-model="productForm.categoryCode"
                  style="margin-top:-34px;display: block;"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
            v-if="editable"
          >
            <el-form-item
              label="商品编码："
              prop="skuCode"
              :rules="[{max:20, message:'最长20位', trigger: 'blur'}]"
            >
              <el-input
                v-model="productForm.skuCode"
                placeholder="请输入商品编码"
                size="small"
                class="formitem"
                :disabled="editable"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="商品名称："
              prop="skuName"
              :rules="[{required: true, message:'必填项'},{max:100, message:'最长100位', trigger: 'blur'}]"
            >
              <el-input
                v-model="productForm.skuName"
                placeholder="请输入商品名称"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="商品简称："
              prop="skuShortName"
              :rules="[{max:20, message:'最长20位', trigger: 'blur'}]"
            >
              <el-input
                v-model="productForm.skuShortName"
                placeholder="请输入商品简称"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="商品描述："
              prop="skuDesc"
              :rules="[{max:20, message:'最长20位', trigger: 'blur'}]"
            >
              <el-input
                v-model="productForm.skuDesc"
                placeholder="请输入商品描述"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="包装单位："
              prop="packUnitName"
              :rules="[{required: true, message:'必填项'}]"
            >
              <el-input
                v-model="productForm.packUnitName"
                placeholder="请输入商品包装单位"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="采用开始日："
              prop="useDate"
              :rules="[{required: true, message:'必填项', trigger: 'change'}]"
            >
              <el-date-picker
                v-model="productForm.useDate"
                size="small"
                class="formitem"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="品牌："
              prop="brandName"
              :rules="[{required: true, message:'必填项', trigger: 'change'},{max:20, message:'最长20位', trigger: 'blur'}]"
            >
              <el-input
                v-model="productForm.brandName"
                placeholder="请输入品牌"
                size="small"
                class="formitem"
                :disabled="editable"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="规格："
              prop="skuFormat"
              :rules="[{required: true, message:'必填项', trigger: 'change'},{max:50, message:'最长50位', trigger: 'blur'}]"
            >
              <el-input
                v-model="productForm.skuFormat"
                placeholder="请输入规格"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="型号："
              prop="skuModel"
              :rules="[{required: true, message:'必填项', trigger: 'change'},{max:50, message:'最长50位', trigger: 'blur'}]"
            >
              <el-input
                v-model="productForm.skuModel"
                placeholder="请输入型号"
                size="small"
                class="formitem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="商品状态："
              prop="materialState"
            >
              <el-select
                v-model="productForm.materialState"
                clearable
                placeholder="请选择商品状态"
                size="small"
                class="formitem"
              >
                <el-option
                  v-for="item in productEnum['materialState']"
                  :label="item.name"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :sm="12"
            :md="8"
            :lg="8"
            :xl="6"
          >
            <el-form-item
              label="基准结算价："
              prop="baseSettlementPrice"
              :rules="[{required: true, message:'必填项', trigger: 'change'}]"
            >
              <el-input
                type="number"
                v-model="productForm.baseSettlementPrice"
                class="formitem"
                size="small"
                placeholder="请输入基准结算价"
              >
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-tabs
        v-model="activeTab"
        type="card"
        class="mt20"
      >
        <el-tab-pane
          label="基本信息"
          name="first"
        >
          <el-row>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="订货区分："
                prop="orderType"
              >
                <el-select
                  v-model="productForm.orderType"
                  clearable
                  placeholder="请选择订货区分"
                  size="small"
                  class="formitem"
                >
                  <el-option
                    v-for="item in productEnum['orderType']"
                    :label="item.name"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="商品管理区分："
                prop="mangerType"
              >
                <el-select
                  v-model="productForm.mangerType"
                  clearable
                  placeholder="请选择商品管理"
                  size="small"
                  class="formitem"
                >
                  <el-option
                    v-for="item in productEnum['mangerType']"
                    :label="item.name"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="在库区分："
                prop="saleType"
                :rules="[{required: true, message:'必填项', trigger: 'change'}]"
              >
                <el-select
                  v-model="productForm.saleType"
                  clearable
                  placeholder="请选择在库区分"
                  size="small"
                  class="formitem"
                >
                  <el-option
                    v-for="item in mapConfig['getSaleType']||[]"
                    :label="item.value"
                    :key="item.key"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="进项税率：">
                <el-input
                  type="number"
                  v-model="productForm.incomeTaxRate"
                  class="formitem"
                  size="small"
                  placeholder="请输入进项税率"
                >
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="销项税率：">
                <el-input
                  type="number"
                  v-model="productForm.outputTaxRate"
                  class="formitem"
                  size="small"
                  placeholder="请输入销项税率"
                >
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="商品标签区分："
                prop="skuTag"
              >
                <el-input
                  type="text"
                  v-model="productForm.skuTag"
                  class="formitem"
                  size="small"
                  placeholder="请输入商品标签"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="期望毛利率：">
                <el-input
                  type="number"
                  v-model="productForm.expectGrossProfit"
                  class="formitem"
                  size="small"
                  placeholder="请输入期望毛利率"
                >
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="尺寸单位区分："
                prop="sizeUnitName"
              >
                <el-select
                  v-model="productForm.sizeUnitName"
                  clearable
                  placeholder="请选择尺寸单位"
                  size="small"
                  class="formitem"
                >
                  <el-option
                    v-for="item in productEnum['sizeUnitName']"
                    :label="item.name"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="重量：">
                <el-input
                  type="number"
                  v-model="productForm.skuWeight"
                  class="formitem"
                  size="small"
                  placeholder="请输入重量"
                >
                  <span slot="suffix">kg</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="保质期区分："
                prop="shelfLifeUnitName"
              >
                <el-select
                  v-model="productForm.shelfLifeUnitName"
                  clearable
                  placeholder="请选择保质期区分"
                  size="small"
                  class="formitem"
                >
                  <el-option
                    v-for="item in productEnum['shelfLifeUnitName']"
                    :label="item.name"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="安全库存：">
                <el-input
                  type="number"
                  v-model="productForm.safeStockFactor"
                  class="formitem"
                  size="small"
                  placeholder="请输入安全库存"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="长：">
                <el-input
                  type="number"
                  v-model="productForm.skuLength"
                  class="formitem"
                  size="small"
                  placeholder="请输入长度"
                >
                  <span slot="suffix">m</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="体积：">
                <el-input
                  type="number"
                  v-model="productForm.skuVolume"
                  class="formitem"
                  size="small"
                  placeholder="请输入体积"
                >
                  <span slot="suffix">m³</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="保质期：">
                <el-input
                  type="number"
                  v-model="productForm.shelfLife"
                  class="formitem"
                  size="small"
                  placeholder="请输入保质期"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="目标周转日数：">
                <el-input
                  type="number"
                  v-model="productForm.tagerTurnoverDays"
                  class="formitem"
                  size="small"
                  placeholder="请输入周转日数"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="宽：">
                <el-input
                  type="number"
                  v-model="productForm.skuBreadth"
                  class="formitem"
                  size="small"
                  placeholder="请输入宽度"
                >
                  <span slot="suffix">m</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="等级：">
                <el-input
                  type="text"
                  v-model="productForm.skuLevel"
                  class="formitem"
                  size="small"
                  placeholder="请输入等级"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="退货区分："
                prop="skuReturnType"
              >
                <el-select
                  v-model="productForm.skuReturnType"
                  clearable
                  placeholder="请选择退货区分"
                  size="small"
                  class="formitem"
                >
                  <el-option
                    v-for="item in productEnum['skuReturnType']"
                    :label="item.name"
                    :key="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="最大在库数量：">
                <el-input
                  type="number"
                  v-model="productForm.maxStockQty"
                  class="formitem"
                  size="small"
                  placeholder="请输入最大在库数量"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="高：">
                <el-input
                  type="number"
                  v-model="productForm.skuHeight"
                  class="formitem"
                  size="small"
                  placeholder="请输入高度"
                >
                  <span slot="suffix">m</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item label="产地：">
                <el-input
                  type="text"
                  v-model="productForm.productFactory"
                  class="formitem"
                  size="small"
                  placeholder="请输入产地"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="销售区分："
                prop="skuStockType"
              >
                <el-input
                  type="text"
                  v-model="productForm.skuStockType"
                  class="formitem"
                  size="small"
                  placeholder="请输入销售区分"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :sm="12"
              :md="8"
              :lg="8"
              :xl="6"
            >
              <el-form-item
                label="备注："
                prop="remarkInfo"
              >
                <el-input
                  type="text"
                  v-model="productForm.remarkInfo"
                  class="formitem"
                  size="small"
                  placeholder="请输入产地"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="客户信息"
          name="second"
        >
          <!-- <search
            :config="customerConfig"
            :justify="'end'"
            :confirmText="confirmText"
            :labelWidth="100"
            :formData="customerEditData"
            :showResetButton="false"
            ref="customerForm"
            @submitForm="submitCustomerForm"
          >
          </search> -->
          <el-card shadow="hover">
            <el-form
              :model="newCustomerForm"
              :labelWidth="'100px'"
              ref="tcfForm2"
            >
              <el-row>
                <el-col
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="6"
                >
                  <el-form-item
                    label="客户"
                    prop="customerCode"
                    :rules="[{required: true, message:'必填项'}]"
                  >
                    <div style="min-height: 40px;display: flex;align-items: center;">
                      <span style="display: block;line-height: 1.2;">
                        {{!!currentRow ? currentRow.value : ''}} <a
                          href="JavaScript:void(0)"
                          style="color:#409EFF;white-space: nowrap;"
                          @click="showCustomerDialogTable"
                        >选择客户</a>
                      </span>
                    </div>

                    <!-- <el-input
                      v-model="newCustomerForm.customerCode"
                      placeholder="请选择客户"
                      size="small"
                      class="formitem"
                    ></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="6"
                >
                  <el-form-item
                    label="客户商品编码"
                    prop="customerSkuCode"
                  >
                    <el-input
                      v-model="newCustomerForm.customerSkuCode"
                      placeholder="请输入商品编码"
                      size="small"
                      class="formitem"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="6"
                >
                  <el-form-item
                    label="客户商品名称"
                    prop="customerSkuName"
                  >
                    <el-input
                      v-model="newCustomerForm.customerSkuName"
                      placeholder="请输入客户商品名称"
                      size="small"
                      class="formitem"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="6"
                >
                  <el-form-item
                    label="商品分类码"
                    prop="customerSkuType"
                  >
                    <el-input
                      v-model="newCustomerForm.customerSkuType"
                      placeholder="请输入客户商品分类码"
                      size="small"
                      class="formitem"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="6"
                >
                  <el-form-item
                    label="客户销价"
                    prop="sellPrice"
                    :rules="[{required: true, message:'必填项'}]"
                  >
                    <el-input
                      v-model="newCustomerForm.sellPrice"
                      placeholder="请输入客户销价"
                      size="small"
                      class="formitem"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="6"
                >
                  <el-form-item
                    label="采用开始日"
                    prop="useDate"
                  >
                    <el-date-picker
                      v-model="newCustomerForm.useDate"
                      size="small"
                      class="formitem"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="6"
                >
                  <el-form-item
                    label="价格有效期"
                    prop="priceValid"
                    :rules="[{required: true, message:'必填项'}]"
                  >
                    <el-date-picker
                      v-model="newCustomerForm.priceValid"
                      size="small"
                      class="formitem"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="6"
                >
                  <el-form-item
                    label="备注"
                    prop="remarkInfo"
                  >
                    <el-input
                      type="textarea"
                      v-model="newCustomerForm.remarkInfo"
                      :rows="1"
                      size="small"
                    ></el-input>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row
                type="flex"
                justify="end"
              >
                <el-button
                  @click="customerFormSubmit"
                  type="primary"
                >{{confirmText}}</el-button>
              </el-row>
            </el-form>
          </el-card>
          <el-table
            size="small"
            style="margin-top:16px"
            :data="customerTableData"
            border
          >
            <el-table-column
              type="index"
              label="序号"
              width="55"
            ></el-table-column>
            <el-table-column
              v-for="(column, index) in customerConfig"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
            >
              <template slot-scope="scope">
                <span v-if="column.type === 'date' &&　scope.row[column.prop]">{{scope.row[column.prop] | parseTime}}</span>
                <span v-else-if="column.prop === 'customerCode' &&　scope.row[column.prop]">{{scope.row['customerName']}}</span>
                <span v-else>{{scope.row[column.prop]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              fixed="right"
            >
              <template slot-scope="scope">
                <span>
                  <a
                    :style="linkstyle"
                    @click="delRow(scope.row)"
                  >删除</a>
                  <a
                    :style="linkstyle"
                    @click="editRow(scope.row)"
                  >修改</a>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          label="供应商信息"
          name="third"
        >
          <search
            :config="servicerConfig"
            :justify="'end'"
            :confirmText="servicerConfirmText"
            :labelWidth="100"
            :formData="servicerEditData"
            :showResetButton="false"
            ref="servicerForm"
            @submitForm="submitServicerForm"
          ></search>
          <el-table
            size="small"
            style="margin-top:16px"
            :data="servicerTableData"
            border
          >
            <el-table-column
              type="index"
              label="序号"
              width="55"
            ></el-table-column>
            <el-table-column
              v-for="(column, index) in servicerConfig"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
            >
              <template slot-scope="scope">
                <span v-if="column.type === 'date' &&　scope.row[column.prop]">{{scope.row[column.prop] | parseTime}}</span>
                <span v-else-if="column.prop === 'providerCode' &&　scope.row[column.prop]">{{scope.row['providerName']}}</span>
                <span v-else>{{scope.row[column.prop]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              fixed="right"
            >
              <template slot-scope="scope">
                <a
                  :style="linkstyle"
                  @click="delServicerRow(scope.row)"
                >删除</a>
                <a
                  :style="linkstyle"
                  @click="editServicerRow(scope.row)"
                >修改</a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-dialog
      title="选择客户"
      :visible.sync="dialogTableVisible"
      width="800px"
      :close-on-click-modal="false"
    >
      <div>
        <el-input
          v-model="customerSearch"
          placeholder="请输入客户编码"
          style="width:200px;"
          maxlength="20"
        ></el-input>
        <el-button
          type="primary"
          size="small"
          @click="currentPage=1;updateCustomer()"
          :loading="customerListLoading"
        >查询</el-button>

      </div>
      <el-table
        :data="customerList"
        size="small"
        v-loading="customerListLoading"
        ref="singleTable"
        highlight-current-row
        @current-change="chooseCustomer"
      >
        <el-table-column
          property="key"
          label="客户编码"
        ></el-table-column>
        <el-table-column
          property="value"
          label="客户名称"
        ></el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right;"
        v-if="!!customerTotal"
        size="small"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="currentPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="customerTotal"
      >
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import search from '@/components/Search'
import choiceCategory from './components/choiceCategory'
import * as productEnum from './components/productEnum'
import { customerConfig, servicerConfig } from './components/config'
import Sticky from '@/components/Sticky'
import { addProduct } from '@/api'
import { updateProduct, productDetail } from '@/api/productcenter'
import { getOwnerCustList, getOwnerProviderList } from '@/api/mis'
import { findValue } from '@/utils'
import _ from 'lodash';
export default {
  name: 'newproduct',
  components: { search, choiceCategory, Sticky },
  data() {
    return {
      productForm: {
        currentCode: null,
        saleType: 3,
      },
      activeTab: 'first',
      customerConfig,
      servicerConfig,
      customerEditData: {},
      customerTableData: [],
      servicerEditData: {},
      servicerTableData: [],
      linkstyle: {
        color: '#3399ea',
        whiteSpace: 'nowrap',
        margin: '0 10px 0 0'
      },
      confirmText: '添加',
      servicerConfirmText: '添加',
      submitloading: false,
      productEnum,
      customerList: [],
      dialogTableVisible: false,
      newCustomerForm: {},
      currentPage: 1,
      currentPageSize: 10,
      customerSearch: '',
      customerTotal: 0,
      ownerobj: {},
      currentRow: null,
      customerListLoading: false,
      categoryValidator: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('必填项'))
        }
        setTimeout(() => {
          if (value.split('-').length < 3) {
            return callback(new Error('请选到三级分类'))
          }
          callback()
        }, 300)
      }
    }
  },
  computed: {
    editable() {
      return Boolean(this.$route.query.skuCode)
    },
    ...mapGetters(['mapConfig', 'userInfo', 'visitedViews'])
  },
  created() {
    if (this.$route.query.skuCode) {
      this.getDetail()
    }
  },
  watch: {
    $route(route) {
      if (route.name === 'newproduct' && !route.query.skuCode) {
        this.$router.go(0)
      }
    }
  },
  methods: {
    showCustomerDialogTable() {
      if (!this.ownerobj || !this.ownerobj.key) {
        return this.$message.warning(`请先选择货主！`)
      }
      this.dialogTableVisible = true
    },
    chooseCustomer(val) {
      if (val) {
        if (this.currentRow && this.currentRow.key === val.key) {
          return
        }
        this.currentRow = val

        this.dialogTableVisible = false
        this.$set(this.newCustomerForm, 'customerCode', val.key)
        this.$set(this.newCustomerForm, 'customerName', val.value)
      }
    },
    handleSizeChange(val) {
      this.currentPageSize = val
      this.currentPage = 1
      this.updateCustomer()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.updateCustomer()
    },
    updateCustomer() {
      this.customerListLoading = true
      let params = {
        ownerCode: this.ownerobj.key,
        pageNum: this.currentPage,
        pageSize: this.currentPageSize
      }
      if (this.customerSearch) {
        params.customerCode = this.customerSearch
      }
      getOwnerCustList(params).then(res => {
        this.customerListLoading = false
        if (!res.success) return
        const result = res.data.list || []
        const options = []
        result.forEach(item => options.push({ value: item.customerName, key: item.customerCode }))
        this.customerList = options
        this.customerTotal = res.data.total
        this.$nextTick(() => {
          if (this.currentRow) {
            let temp = this.customerList.find(v => v.key === this.currentRow.key)
            if (temp) {
              this.currentRow = temp
              this.$refs.singleTable.setCurrentRow(this.currentRow)
            }
          }
        })
      }).catch(err => {
        this.customerListLoading = false
      })
    },
    customerFormResetForm() {
      this.$refs['tcfForm2'].resetFields()
      this.newCustomerForm = {}
      this.currentRow = null
    },
    customerFormLoadData() {
      this.$nextTick(() => {
        this.newCustomerForm = JSON.parse(JSON.stringify(this.customerEditData))
        this.currentRow = {
          key: this.newCustomerForm.customerCode,
          value: this.newCustomerForm.customerName,
        }
      })
    },
    customerFormSubmit() {
      this.$refs['tcfForm2'].validate((valid) => {
        if (valid) {
          this.submitCustomerForm(this.newCustomerForm)
        }
      })
    },
    getDetail() {
      const loading = this.$loading({ text: '请稍后..' })
      productDetail({ skuCode: this.$route.query.skuCode }).then(res => {
        const result = res.data || {}
        const { skuCustomerInfoRespList, skuProviderInfoRespList, ownerCode, ownerName, ...rest } = result
        this.customerTableData = skuCustomerInfoRespList
        this.servicerTableData = skuProviderInfoRespList
        this.productForm = { owner: { key: ownerCode, value: ownerName }, ...rest }
        this.$refs.categoryChoice.fetchCategory({ text: result.categoryName, currentCode: result.categoryCode })
        this.ownerChange({ key: ownerCode, value: ownerName }, true)
        loading.close()
      }).catch(err => {
        loading.close()
      })
    },



    ownerChange(val, isFirst) {
      const ownerobj = val || {}
      this.ownerobj = ownerobj
      this.customerFormResetForm()
      if (!isFirst) {
        this.customerTableData = []
      }
      this.customerList = []
      this.updateCustomer()
      getOwnerProviderList({ ownerCode: ownerobj.key }).then(res => {
        let servicerEditData = _.cloneDeep(this.servicerEditData);
        servicerEditData.providerCode = '';
        this.servicerEditData = servicerEditData;

        const result = res.data || []
        const options = []
        result.forEach(item => options.push({ value: item.providerName, key: item.providerCode }))
        this.servicerConfig.find(customer => customer.prop === 'providerCode').selectOptions = options
        this.$refs['servicerForm'].loadData()
      })
    },
    categorySubmit(item) {
      this.$set(this.productForm, 'categoryCode', item.currentCode)
      this.$set(this.productForm, 'categoryName', item.text)
    },
    onSubmit() {
      const view = this.visitedViews.filter(v => v.path === this.$route.path)
      this.$refs['tcfForm2'].clearValidate(['customerCode'])
      this.$refs['servicerForm'].$refs['tcfForm'].clearValidate(['providerCode'])
      if (this.productForm.categoryCode) {
        this.$refs['productForm'].clearValidate(['categoryCode'])
      }
      this.$refs['productForm'].validate((valid) => {
        if (valid) {
          this.submitloading = true
          const { skuCode, owner, baseSettlementPrice, ...rest } = this.productForm
          const postForm = {
            ownerCode: owner.key,
            ownerName: owner.value,
            operator: this.userInfo.id,
            baseSettlementPrice: Number(baseSettlementPrice),
            operatorName: this.userInfo.truename,
            skuCustomerReqList: this.customerTableData,
            skuProviderInfoReqList: this.servicerTableData,
            ...rest
          }
          const editMethod = skuCode ? updateProduct : addProduct
          if (skuCode) {
            postForm.skuCode = skuCode
          }
          postForm.isCheck = true
          editMethod(postForm).then(res => {
            if (!res) {
              this.submitloading = false
              return
            }
            if (res.code === 'ratel-40620008') {
              this.$delConfirm(`商品名称【${postForm.skuName}】已存在，是否继续？`, () => {
                postForm.isCheck = false
                return editMethod(postForm).then(res => {
                  if (!res) {
                    this.submitloading = false
                    return
                  }
                  this.$message({
                    type: 'success',
                    message: '操作成功,1.5s后跳往详情页',
                    duration: 1500,
                    onClose: () => {
                      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                        this.$router.push({ name: 'productsList' })
                      })
                    }
                  })
                })
              })
            } else {
              this.$message({
                type: 'success',
                message: '操作成功,1.5s后跳往详情页',
                duration: 1500,
                onClose: () => {
                  this.$store.dispatch('delVisitedViews', view[0]).then(() => {
                    this.$router.push({ name: 'productsList' })
                  })
                }
              })
            }
          })
        } else if (this.productForm.categoryCode) {
          this.$refs['productForm'].clearValidate(['categoryCode'])
        }
      })
    },
    submitCustomerForm(val) {
      let customerTableData = _.cloneDeep(this.customerTableData)
      val = JSON.parse(JSON.stringify(val))
      if (val.edit) {
        let position = -1
        customerTableData.forEach((item, index) => {
          if (item.edit) position = index
        })
        customerTableData.splice(position, 1, JSON.parse(JSON.stringify({ ...val, edit: false })))
        this.customerFormResetForm()
        this.confirmText = '添加'
      } else {
        let index = customerTableData.findIndex(v => v.customerCode === val.customerCode);
        if (index === -1) {
          customerTableData.push(JSON.parse(JSON.stringify(val)))
        } else {
          customerTableData[index] = JSON.parse(JSON.stringify(val))
        }
      }
      this.customerTableData = customerTableData;
      this.customerEditData = {};
      this.currentRow = null
      this.$refs['tcfForm2'].resetFields()
    },

    submitServicerForm(val) {
      let servicerTableData = _.cloneDeep(this.servicerTableData)
      const servicer = this.servicerConfig.find(provider => provider.prop === 'providerCode') || {}
      const providers = servicer.selectOptions || []
      val.providerName = (providers.find(provider => provider.key === val.providerCode) || {}).value
      if (val.edit) {
        let position = -1
        servicerTableData.forEach((item, index) => {
          if (item.edit) position = index
        })
        servicerTableData.splice(position, 1, JSON.parse(JSON.stringify({ ...val, edit: false })))
        this.$refs.servicerForm.resetForm()
        this.servicerConfirmText = '添加'
      } else {
        let index = servicerTableData.findIndex(v => v.providerCode === val.providerCode);
        if (index === -1) {
          servicerTableData.push(JSON.parse(JSON.stringify(val)))
        } else {
          servicerTableData[index] = JSON.parse(JSON.stringify(val))
        }
      }
      this.servicerTableData = servicerTableData;
      this.$refs['servicerForm'].$refs['tcfForm'].resetFields()
    },

    delRow(row) {
      this.customerTableData = this.customerTableData.filter(item => item !== row)
    },
    editRow(row) {
      row.edit = true
      this.confirmText = '确定修改'
      this.customerEditData = row
      this.customerFormLoadData()
    },
    delServicerRow(row) {
      this.servicerTableData = this.servicerTableData.filter(item => item !== row)
    },
    editServicerRow(row) {
      row.edit = true
      this.servicerConfirmText = '确定修改'
      this.servicerEditData = row
      this.$refs.servicerForm.loadData()
    }
  }
}
</script>

<style lang="scss">
.NewProduct {
  .el-form-item {
    height: 30px;
    margin-bottom: 36px;
  }
  th.el-table-column--selection {
    visibility: hidden;
  }
}
</style>
