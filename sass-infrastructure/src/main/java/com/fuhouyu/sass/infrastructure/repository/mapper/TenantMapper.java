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
package com.fuhouyu.sass.infrastructure.repository.mapper;

import com.fuhouyu.sass.infrastructure.repository.orm.TenantDO;

/**
 * <p>
 * 租户mapper接口
 * </p>
 *
 * @author fuhouyu
 * @since 2024/9/20 22:29
 */
public interface TenantMapper extends BaseMapper<TenantDO, Long> {

    /**
     * 通过租户编码进行查询
     *
     * @param tenantCode 租户编码
     * @return 租户do实体对象
     */
    TenantDO queryByTenantCode(String tenantCode);
}
