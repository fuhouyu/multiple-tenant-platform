/*
 * Copyright 2024-2024 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.fuhouyu.tenant.infrastructure.repository.orm;

import lombok.*;

/**
 * <p>
 * 租户do对象
 * </p>
 *
 * @author fuhouyu
 * @since 2024/9/20 22:25
 */
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
public class TenantDO extends BaseDO {


    /**
     * 主键id
     */
    private Long id;

    /**
     * 租户编码
     */
    private String tenantCode;

    /**
     * 租户名称
     */
    private String tenantName;

    /**
     * 租户类型
     */
    private String tenantType;

    /**
     * 备注
     */
    private String remark;

    /**
     * 租户图标
     */
    private String icon;

    /**
     * 联系人
     */
    private String contactPerson;

    /**
     * 联系电话
     */
    private String contactNumber;

    /**
     * 删除标记
     */
    private Boolean isDeleted;
}
