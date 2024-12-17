import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceRuleService } from './service_rule.service';
import { CreateServiceRuleDto } from './dto/create-service_rule.dto';
import { UpdateServiceRuleDto } from './dto/update-service_rule.dto';

@ApiTags('Service Rules') // Adding the tag for Swagger documentation
@Controller('service-rule')
export class ServiceRuleController {
  constructor(private readonly serviceRuleService: ServiceRuleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service rule' })
  @ApiResponse({
    status: 201,
    description: 'The service rule has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data sent for creating the service rule.',
  })
  async create(@Body() createServiceRuleDto: CreateServiceRuleDto) {
    return await this.serviceRuleService.create(createServiceRuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all service rules' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all service rules.',
  })
  async findAll() {
    return await this.serviceRuleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific service rule by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the service rule.',
  })
  @ApiResponse({
    status: 404,
    description: 'Service rule with the provided ID not found.',
  })
  async findOne(@Param('id') id: string) {
    const ruleId = +id; // Ensure the ID is a number
    if (isNaN(ruleId)) {
      throw new NotFoundException('Service rule ID must be a number');
    }

    const serviceRule = await this.serviceRuleService.findOne(ruleId);
    if (!serviceRule) {
      throw new NotFoundException(`Service rule with ID ${ruleId} not found`);
    }
    return serviceRule;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing service rule' })
  @ApiResponse({
    status: 200,
    description: 'The service rule has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Service rule with the provided ID not found for update.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateServiceRuleDto: UpdateServiceRuleDto,
  ) {
    const ruleId = +id;
    if (isNaN(ruleId)) {
      throw new NotFoundException('Service rule ID must be a number');
    }

    const updatedRule = await this.serviceRuleService.update(
      ruleId,
      updateServiceRuleDto,
    );
    if (!updatedRule) {
      throw new NotFoundException(
        `Service rule with ID ${ruleId} not found for update`,
      );
    }
    return updatedRule;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service rule by ID' })
  @ApiResponse({
    status: 200,
    description: 'The service rule has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Service rule with the provided ID not found for deletion.',
  })
  async remove(@Param('id') id: string) {
    const ruleId = +id;
    if (isNaN(ruleId)) {
      throw new NotFoundException('Service rule ID must be a number');
    }

    // Directly call remove and assume it succeeds if no exception is thrown
    await this.serviceRuleService.remove(ruleId);

    // Return a success message after successful deletion
    return { message: 'Service rule deleted successfully' };
  }
}
